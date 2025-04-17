import {
  Component,
  ViewChildren,
  ElementRef,
  QueryList,
  ViewChild,
  ChangeDetectorRef,
  Renderer2,
  OnInit
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ParametrosInfo } from '@models/parametros/parametros';
import { MatTableDataSource } from '@angular/material/table';
import { UniversoPago } from '@models/nuevo-pago/universo';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import html2canvas from 'html2canvas';
import { MenuItem } from 'primeng/api';

//(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
type MessageType =
  | 'modparams'
  | 'confparams'
  | 'crearCiclo'
  | 'cancelarParametros'
  | 'avanzarASegmentacion'
  | 'confirmacionCreado';

@Component({
  selector: 'app-nuevo-ciclo',
  templateUrl: './nuevo-ciclo.component.html',
  styleUrls: ['./nuevo-ciclo.component.scss']
})
export class NuevoCicloComponent implements OnInit {
  @ViewChildren('matIcon') matIconElements!: QueryList<ElementRef>;
  @ViewChild('stepper') stepper!: MatStepper;
  pdfVisible = false;
  // Variables para almacenar los datos de cada solicitud de Parametros
  datosPensionMinima: any;
  datosPensionBasica: any;
  datosValoresIngreso: any;
  datosValoresSalud: any;
  datosValoresPmas: any;
  datosFondosCuota: any;
  datosTramosImpuestos: any = {};
  datosValoresAsignacionFamiliar: any = {};
  datosBonificaciones: any = {};
  datosValoresUf: any;
  datosValorRebajaAsigZona: any;
  /* */

  isLinear = false;
  isEditable = false;
  tipoProceso = 'Pago Diario';
  paso = 'parametros';
  //paso: string = 'segmentacion'
  // paso: string = 'universodepago'

  showPdf = false;
  enableSegmentacion = false;
  enableUniverso = true;
  stepControlParametro = false;
  stepControlSegmentacion = false;
  stepControlUniverso = false;
  displayedColumnsAF: string[] = ['rango', 'desde', 'hasta', 'monto'];
  displayedColumnsBonif: string[] = ['categoria', 'conyuge', 'madre'];
  displayedColumnsTramos: string[] = [
    'tramo',
    'desde',
    'hasta',
    'rebaja',
    'tasa'
  ];

  showSeleccionTipos = false;
  seleccionadoPrimerPago = false;
  seleccionadoPensioTras = false;
  seleccionadoReiteracion = false;
  seleccionadoBeneficios = false;
  seleccionadoTodos = false;
  seleccionadoSinSegmentacion = true;
  seleccionadoTipos = false;
  enableCrearCicloButton = false;
  enableAprobarParamButton = false;

  opcionesTipos = [
    // { opcion: 'Todos', valor: '' },
    { opcion: 'Saldo', valor: 'Saldos' },
    { opcion: 'Financiamiento', valor: 'Financiamientos' }
  ];
  opcionesTiposSaldo = [
    { opcion: 'Alto', valor: 'Altos' },
    { opcion: 'Bajo', valor: 'Bajos' }
  ];
  opcionesTiposFinancia = [
    { opcion: 'Mixto', valor: '0' },
    { opcion: 'Compañía de Seguros', valor: '1' },
    { opcion: 'Fondo', valor: '2' },
    { opcion: 'Garantía Estatal', valor: '3' }
  ];
  opcionesTiposSeleccion = [{ opcion: '', valor: '' }];

  primerPagoTipo = '';
  primerPagoSaldo = '';
  traspasadosTipo = 'Financiamiento';
  traspasadosSaldo = '';

  selectedTipo = '';
  selectedSaldo = '';

  mensajeconfirmado = '';

  parametrosInfo: ParametrosInfo[] = [];
  paramsDetail: any;

  fechaActual: string | null = null;

  fechaDisponibilidad = '01/04/2025';
  fechaDisponibilidadBack!: string;
  fechaDisponibilidadFront!: string;
  fechaProximoPago = '';
  fechaCuota = '01/04/2025';
  fechaCuotaBack!: string;

  registrosTotales = 0;
  datosRegistros: any;

  universoTableInfo: any = [
    {
      id: 'nmrocuenta',
      name: 'N° Cuenta',
      type: 'string',
      class: 'header-left',
      show: true
    },
    {
      id: ['rut', 'nombre'],
      name: 'Rut y Nombre',
      type: 'string',
      class: 'header-left',
      show: true,
      template: 1
    },
    {
      id: 'tipobeneficio',
      name: 'Tipo Beneficio',
      type: 'string',
      class: 'header-left',
      show: true
    },
    {
      id: 'modalidad',
      name: 'Modalidad',
      type: 'string',
      class: 'header-left',
      show: true
    },
    {
      id: 'tiponovedad',
      name: 'Tipo Novedad',
      type: 'string',
      class: 'header-left',
      show: true
    },
    {
      id: 'toggle',
      name: 'Exclusión',
      type: 'toggle',
      class: 'header-left',
      show: true,
      toggleAll: true,
      action: (checked: boolean, row: any) => {
        this.exclusionPensionados(checked, row);
      }
    },
    {
      id: 'actions',
      name: 'Acciones',
      type: 'actions',
      class: 'acciones',
      show: true,
      actions: [
        {
          icon: 'visibility',
          action: (row: any) => this.showDetail(row),
          class: 'icon'
        }
      ]
    }
  ];

  headerButton: any = {
    name: 'Descargar universo',
    icon: 'file_download',
    class: 'mat-stroked-button btn-large',
    color: 'primary',
    enabled: true,
    type: 1,
    action: () => {
      this.downloadReport();
    }
  };

  dataSource: MatTableDataSource<UniversoPago> =
    new MatTableDataSource<UniversoPago>([
      {
        id: 1,
        rut: '111111-1',
        nombre: 'Angel Gonzalez',
        montoPension: 1000000,
        tipoPago: 'Pensión',
        tipoBeneficio: 'Pensión Básica Solidaria',
        modalidad: 'Mensual',
        fechaInicio: '2023-01-01',
        fechaTermino: '2023-12-31',
        fechaUltimoPago: '2023-10-01',
        estado: 'Activo',
        toggle: false
      },
      {
        id: 2,
        rut: '222222-2',
        nombre: 'Maria Sanchez',
        montoPension: 1000000,
        tipoPago: 'Pensión',
        tipoBeneficio: 'Pensión Básica Solidaria',
        modalidad: 'Mensual',
        fechaInicio: '2023-01-01',
        fechaTermino: '2023-12-31',
        fechaUltimoPago: '2023-10-01',
        estado: 'Activo',
        toggle: false
      },
      {
        id: 3,
        rut: '333333-3',
        nombre: 'Juan Perez',
        montoPension: 2000000,
        tipoPago: 'Pensión',
        tipoBeneficio: 'Pensión Básica Solidaria',
        modalidad: 'Mensual',
        fechaInicio: '2023-01-01',
        fechaTermino: '2023-12-31',
        fechaUltimoPago: '2023-10-01',
        estado: 'Activo',
        toggle: false
      }
    ]);

  pensionadosExcluidos: number[] = [];
  pensionadosNoExcluidos: number[] = [];
  totalPensionadosExcluidos = 0;

  dataAsignacionFamiliar: MatTableDataSource<any>;
  dataBonificaciones: MatTableDataSource<any>;
  dataTramosImpuestos: MatTableDataSource<any>;

  responsable = 'Usuario no encontrado';
  responsableName = '-';
  responsableLastName = '-';

  showLoading = false;

  //pdf
  datosTramosImpuestosPDF: any[] = [];
  nombreUsuario = '';


  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog,
    // private parametrosService: any,
    private renderer: Renderer2,
    private el: ElementRef
    // private nuevopagoService: any,
    // private crearCicloService: any,
    // private propsService: any
  ) {
    this.dataAsignacionFamiliar = new MatTableDataSource<any>([]);
    this.dataBonificaciones = new MatTableDataSource<any>([]);
    this.dataTramosImpuestos = new MatTableDataSource<any>([]);
  }

  async obtenerProps() {
    // const props = await this.propsService.getPropsAsync();
    // const userInfo = props.propsUtil.getUserAttributes();
    /*this.nombreUsuario = userInfo?.username?.substr(
      0,
      userInfo?.username?.indexOf('@')
    );*/
    this.nombreUsuario = this.nombreUsuario.substr(
      this.nombreUsuario.indexOf('_') + 1
    );
    this.responsable = this.nombreUsuario;
  }

  async calcularFechas() {
    return new Promise((resolve, reject) => {
      const requests = [
        /*this.parametrosService
          .getFechaDisponibilidad()
          .pipe(catchError(() => of(null))),
        this.parametrosService
          .getFechaValorCuota()
          .pipe(catchError(() => of(null))),*/
      ];

      // Todas las solicitudes en paralelo
      forkJoin(requests).subscribe({
        next: (responses: any) => {
          const disponibilidadInfo = responses[0];
          const cuotasInfo = responses[1];

          const partesFecha = disponibilidadInfo.body.fecha.split('/');
          const fechaDisponibilidad = new Date(
            parseInt(partesFecha[2]), // Año
            parseInt(partesFecha[1]) - 1, // Mes (se resta 1 porque los meses van de 0 a 11)
            parseInt(partesFecha[0]) // Día
          );
          this.fechaDisponibilidad = formatDate(
            fechaDisponibilidad,
            'dd-MM-yyyy',
            'en-US'
          );

          this.fechaDisponibilidadBack = formatDate(
            fechaDisponibilidad,
            'yyyy-MM-dd',
            'en-US'
          );

          this.fechaDisponibilidadFront = formatDate(
            fechaDisponibilidad,
            'dd-MM-yyyy',
            'en-US'
          );

          const partesFechaCuota = cuotasInfo.body.fecha.split('/');
          const fechaCuota = new Date(
            parseInt(partesFechaCuota[2]), // Año
            parseInt(partesFechaCuota[1]) - 1, // Mes (se resta 1 porque los meses van de 0 a 11)
            parseInt(partesFechaCuota[0]) // Día
          );
          this.fechaCuota = formatDate(fechaCuota, 'dd-MM-yyyy', 'en-US');
          this.fechaCuotaBack = formatDate(fechaCuota, 'yyyy-MM-dd', 'en-US');
          resolve(true);
        },
        error: (error) => {
          resolve(false);
        }
      });
    });
  }

  cleanUniverso() {
    this.pensionadosExcluidos = [];
    this.totalPensionadosExcluidos = 0;
    this.dataSource.data = [];
    const deleteAllFilters = this.el.nativeElement.querySelector(
      '.chip-delete-all-filters, .mdc-switch--checked'
    ) as HTMLElement;
    if (deleteAllFilters) {
      deleteAllFilters.click();
    } else {
      const deleteChip = this.el.nativeElement.querySelector(
        '.chip-remove-filter, .mdc-switch--checked'
      ) as HTMLElement;

      if (deleteChip) deleteChip.click();
    }
  }

  async getHaberesDetail(codiBeneficiario: number) {
    return new Promise((resolve, reject) => {
      /*      this.nuevopagoService
              .getHaberes(codiBeneficiario)
              .subscribe(async (response: any) => {
                resolve(response.data);
              });*/
    });
  }

  async getFinanciamientosDetail(codiBeneficiario: number) {
    return new Promise((resolve, reject) => {
      /*      this.nuevopagoService
              .getFinanciamientos(codiBeneficiario)
              .subscribe(async (response: any) => {
                resolve(response.data);
              });*/
    });
  }

  async showDetail(info: any) {
    info.haberesDetail = [];
    this.showLoading = true;
    if (
      info.tiponovedad.toLowerCase() === 'haberes' ||
      info.haberes?.trim() !== ''
    ) {
      info.financiamientosDetail = await this.getFinanciamientosDetail(info.id);
      info.haberesDetail = await this.getHaberesDetail(info.id);
    } else {
      info.financiamientosDetail = await this.getFinanciamientosDetail(info.id);
    }
    this.showLoading = false;
    /*this.dialog.open(SidebarDetalleComponent, {
      width: '30%',
      maxHeight: '100vh',
      position: { right: '0' },
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '300ms',
      data: info,
    });*/
  }

  async ngOnInit(): Promise<void> {

    this.setearParametros();
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    this.fechaActual = `${day}/${month}/${year}`;
    await this.obtenerProps();
  }

  async setearParametros() {
    await this.calcularFechas();
    this.obtenerParametros();
  }

  avanzar() {
    this.stepper.next();
  }

  crearCiclo() {
    const validarValor = (valor: any) => (valor ? valor : 0);
    const addParametro = (id: number, valor: string, descripcion: string) =>
      parametros.push({ id, valor, descripcion });
    const parametros: any[] = [
      ...(this.datosTramosImpuestos?.body?.map((tramo: any) => ({
        id: 1,
        valor: [tramo.rangoIni, tramo.rangoFin, tramo.mtoRebaja, tramo.factor]
          .map(validarValor)
          .join(';'),
        descripcion: tramo.descripcion
      })) || []),
      ...(this.datosPensionMinima?.body?.map((minima: any) => ({
        id: 2,
        valor: validarValor(minima.mntoPension),
        descripcion: validarValor(minima.descRango)
      })) || []),
      ...(this.datosPensionBasica?.body?.map((basica: any) => ({
        id: 3,
        valor: validarValor(basica.mntoPension),
        descripcion: validarValor(basica.descRango)
      })) || []),
      ...(this.dataAsignacionFamiliar?.data?.map(
        (fila: any, index: number) => ({
          id: 7,
          valor: [fila.rango, fila.desde, fila.hasta, fila.monto]
            .map(validarValor)
            .join(';'),
          descripcion: `Asignación Familiar Fila ${index + 1}`
        })
      ) || []),
      ...(this.dataBonificaciones?.data?.map((bonificacion: any) => ({
        id: 8,
        valor: [bonificacion.valorConyuge, bonificacion.valorMadre]
          .map(validarValor)
          .join(';'),
        descripcion: bonificacion.categoria
      })) || []),
      {
        id: 4,
        valor: [
          this.datosValoresIngreso?.body?.ingresoMinimo,
          this.datosValoresIngreso?.body?.ingMinSinIncremento,
          this.datosValoresIngreso?.body?.sueldoVital
        ]
          .map(validarValor)
          .join(';'),
        descripcion: 'Valores de Ingreso'
      },
      {
        id: 5,
        valor: [
          this.datosValoresSalud?.body?.porcentajeDisponible,
          this.datosValoresSalud?.body?.topeImponible
        ]
          .map(validarValor)
          .join(';'),
        descripcion: 'Valores Salud'
      },
      {
        id: 6,
        valor: validarValor(this.datosValoresPmas?.body?.valor),
        descripcion: validarValor(this.datosValoresPmas?.body?.descripcion)
      },
      {
        id: 9,
        valor: validarValor(this.datosValoresUf?.body?.valorUF?.valor),
        descripcion: `Valor UF ${this.datosValoresUf?.body?.valorUF?.fechaParametro}`
      },
      {
        id: 9,
        valor: validarValor(this.datosValoresUf?.body?.valorUfSalud?.valor),
        descripcion: `Valor Salud UF ${this.datosValoresUf?.body?.valorUfSalud?.fechaParametro}`
      },
      {
        id: 10,
        valor: validarValor(
          this.datosValorRebajaAsigZona?.body?.rebajaAsigZona
        ),
        descripcion: 'Rebaja Asignación Zona'
      }
    ];
    this.datosFondosCuota?.forEach((monto: any, index: any) => {
      addParametro(
        11,
        `${index + 1};${validarValor(monto.monto)}`,
        `Valor Cuota`
      );
    });
    addParametro(12, validarValor(this.fechaCuota), 'Fecha valor Cuota');

    addParametro(
      13,
      validarValor(this.fechaDisponibilidad),
      'Fecha Disponibilidad'
    );
    addParametro(14, this.fechaProximoPago, 'Fecha Proximo Pago Pensión');

    /*    this.crearCicloService
          .crearCiclo({
            segmentacion: this.getSegmentacion('creacion'),
            parametros,
            pensionadosExcluidos: this.pensionadosExcluidos.map((id) => ({ id })),
            pensionadosNoExcluidos: this.dataSource.data
              .filter((item) => !this.pensionadosExcluidos.includes(item.id))
              .map((item) => ({ id: item.id })),
          })
          .subscribe((response: any) => {
            this.openDialog('confirmacionCreado', response.data.cicloId);
            this.navigateToHistorial();
          });*/
  }

  openDialog(tipomensaje: MessageType, cicloId = '0'): void {
    const cantidadIdsEnPensionados = this.dataSource.data.filter(
      (item) => !this.pensionadosExcluidos.includes(item.id)
    ).length;

    // Valida si cantidadIdsEnPensionados es mayor que 0 antes de proceder con 'crearCiclo'
    if (tipomensaje === 'crearCiclo' && cantidadIdsEnPensionados <= 0) {
      this.openDialogNoCrearCiclo(cantidadIdsEnPensionados);
      return; // No continuar con el flujo de openDialog
    }

    const dialogData: { [key in MessageType]: [string, string, string, any?] } =
      {
        modparams: [
          'Modificar parámetros',
          'Si quieres modificar los parámetros, te vamos a dirigir a la pantalla de Mantenedores.',
          'Ir a parámetros',
          {
            messageTwo:
              'Recuerda que al terminar puedes volver a este mismo punto.'
          }
        ],
        confparams: [
          'Aprobar parámetros',
          'Es posible descargar el PDF luego de la aprobación.',
          'Aprobar Parámetros'
        ],
        crearCiclo: [
          'Crear Ciclo',
          `Se creará un nuevo ciclo de pago, con un total de ${cantidadIdsEnPensionados} casos y ${this.totalPensionadosExcluidos} excluido(s).`,
          'Crear ciclo'
        ],
        cancelarParametros: [
          'Descartar el ciclo de pago',
          'Se descartará el ciclo de pago. Al confirmar esta acción no se guardarán los cambios realizados.',
          'Confirmar',
          { messageTwo: '¿Salir de la creación del ciclo?' }
        ],
        avanzarASegmentacion: [
          'Continuar con la creación',
          'Al continuar con la creación del ciclo se generará una notificación con los parámetros aprobados previamente.',
          'Confirmar'
        ],
        confirmacionCreado: [
          'Ciclo de Pago Creado!',
          `Se ha creado el Ciclo de Pago N° ${cicloId} correctamente.`,
          'Confirmar'
        ]
      };

    const openDialogWithData = (
      title: string,
      message: string,
      messagebutton: string,
      extraData: any = {}
    ) => {
      /*const dialogRef = this.dialog.open(DialogoverviewComponent, {
        data: { title, message, messagebutton, ...extraData },
      });

      dialogRef.afterClosed().subscribe((result) => {

        this.mensajeconfirmado = result;

        const actions: { [key in MessageType]: () => void } = {
          modparams: () => {
            window.open('/home/mantenedores/parametros', '_blank');
          },
          confparams: () => {
            this.showPdf = !!this.mensajeconfirmado;
            this.enableSegmentacion = this.showPdf;
          },
          crearCiclo: () => {
            if (result) {
              this.loadSpinner();
              this.crearCiclo();
            }
          },
          cancelarParametros: () => {
            if (result) this.cancelar();
          },
          avanzarASegmentacion: () => {
            if (result) this.avanzar();
          },
          confirmacionCreado: () => { },
        };

        if (this.mensajeconfirmado === 'yes') {
          actions[tipomensaje]();
        }
      });*/
    };

    const dialogParams = dialogData[tipomensaje];
    if (dialogParams) {
      openDialogWithData(...dialogParams);
    }
  }

  openDialogNoCrearCiclo(cantidadIdsEnPensionados: number): void {
    /*this.dialog.open(DialogoverviewComponent, {
      data: {
        title: 'No se puede Crear Ciclo',
        message: `No se puede crear un nuevo ciclo de pago, con un total de ${cantidadIdsEnPensionados} casos.`,
        messagebutton: 'Cerrar'
      }
    });*/
  }

  /////////////////////////////////////////////////
  obtenerParametros() {
    this.showLoading = true;
    // Define los parámetros comunes a todas las solicitudes
    const queryParamsComunes = new HttpParams().set(
      'fechaParametro',
      this.fechaDisponibilidadBack
    ); // Ajusta la fecha común según necesidades
    const queryParamsCuotas = new HttpParams().set(
      'fechaParametro',
      this.fechaCuotaBack
    ); // Ajusta la fecha común según necesidades
    const parametrosFondosCuota = queryParamsCuotas; //Ajustar paramatero cuando carguen Data
    const parametrosValoresIngreso = queryParamsComunes;
    const parametrosValoresSalud = new HttpParams(); // Ajusta el valor según necesidades
    const parametrosValoresPmas = queryParamsComunes;
    const parametrosTramosImpuestos = new HttpParams();
    const parametrosValoresAsignacionFamiliar = new HttpParams();
    const parametrosBonificaciones = queryParamsComunes; //Ajustar paramatero cuando carguen Data
    const parametrosValoresUf = queryParamsComunes; //Ajustar paramatero cuando carguen Data
    const parametrosValorRebajaAsigZona = new HttpParams();

    // Define las solicitudes en un arreglo
    /*const requests = [
      this.parametrosService
        .getParametrosPorEndpoint('getPensionMinima', new HttpParams())
        .pipe(catchError(() => of(null))),
      this.parametrosService
        .getParametrosPorEndpoint('getPensionBasicaSolidaria', new HttpParams())
        .pipe(catchError(() => of(null))),
      this.parametrosService
        .getParametrosPorEndpoint('valores-ingreso', parametrosValoresIngreso)
        .pipe(catchError(() => of(null))),
      this.parametrosService
        .getParametrosPorEndpoint('valores-salud', parametrosValoresSalud)
        .pipe(catchError(() => of(null))),
      this.parametrosService
        .getParametrosPorEndpoint('valores-pmas', parametrosValoresPmas)
        .pipe(catchError(() => of(null))),

      this.parametrosService
        .getParametrosPorEndpoint(
          'obtenerTramosImpuestosFecha',
          parametrosTramosImpuestos.set('fechaDisponibilidad', this.transformDate(this.fechaDisponibilidad))
        )
        .pipe(catchError(() => of(null))),
      this.parametrosService
        .getParametrosPorEndpoint(
          'valores-asignacion-familiar',
          parametrosValoresAsignacionFamiliar
        )
        .pipe(catchError(() => of(null))),
      this.parametrosService
        .getParametrosPorEndpoint(
          'bonificaciones-obtener',
          parametrosBonificaciones
        )
        .pipe(catchError(() => of(null))),
      this.parametrosService
        .getParametrosPorEndpoint('valores-uf', parametrosValoresUf)
        .pipe(catchError(() => of(null))),
      this.parametrosService
        .getParametrosPorEndpoint(
          'valor-rebaja-asig-zona',
          parametrosValorRebajaAsigZona
        )
        .pipe(catchError(() => of(null))),

      this.parametrosService
        .getParametrosPorEndpoint('obtenerValorCuota', parametrosFondosCuota)
        .pipe(catchError(() => of(null))),

      this.parametrosService
        .getInfoCalendario(this.fechaDisponibilidadFront)
        .pipe(catchError(() => of(null))),
    ];*/

    // Todas las solicitudes en paralelo
    /*forkJoin(requests).subscribe({
      next: (responses) => {
        this.showLoading = false;
        [
          this.datosPensionMinima,
          this.datosPensionBasica,
          this.datosValoresIngreso,
          this.datosValoresSalud,
          this.datosValoresPmas,
          this.datosTramosImpuestos,
          this.datosValoresAsignacionFamiliar,
          this.datosBonificaciones,
          this.datosValoresUf,
          this.datosValorRebajaAsigZona,
        ] = responses;
        if (responses[10])
          /!*this.datosFondosCuota = FondoCuota.createListFontoCuota(
            responses[10].body
          );*!/
        if (responses[11])
          // this.fechaProximoPago = responses[11].fechaPagoRegimen;
        // if (responses[12]) this.fechaDisponibilidad = responses[11].body.fecha;
        // let conjuntoDatosTramosImpuestos = new Set();
        // this.asignarValores(conjuntoDatosTramosImpuestos);
        this.enableAprobarParamButton =
          responses.every((response, index) => {
            if (index === 8)
              return (
                response.body?.valorUF?.valor &&
                response.body?.valorUfSalud?.valor
              );
            if (!response?.body) return true;
            return Array.isArray(response.body)
              ? response.body.length > 0
              : Object.keys(response.body).length > 0;
          }) && this.fechaDisponibilidad !== '';
      },
      error: (error) => {
        this.showLoading = false;
        this.enableAprobarParamButton = false;
        console.error('Error: ' + error);
      },
    });*/
  }

  asignarValores(conjuntoDatosTramosImpuestos: any) {
    this.datosTramosImpuestos.body.forEach((el: any) => {
      conjuntoDatosTramosImpuestos.add(JSON.stringify(el));
    });
    this.datosTramosImpuestos.body = Array.from(
      conjuntoDatosTramosImpuestos
    ).map((el: any) => JSON.parse(el));

    this.datosTramosImpuestosPDF = this.datosTramosImpuestos.body;
    this.datosPensionMinima.body.sort((a: any, b: any) =>
      a.descRango.localeCompare(b.descRango)
    );
    this.datosPensionBasica.body.sort((a: any, b: any) =>
      a.descRango.localeCompare(b.descRango)
    );
    this.dataAsignacionFamiliar = new MatTableDataSource(
      this.datosValoresAsignacionFamiliar.body
    );
    this.dataBonificaciones = new MatTableDataSource(
      this.datosBonificaciones.body
    );
    this.dataTramosImpuestos = new MatTableDataSource(
      this.datosTramosImpuestos.body
    );
  }

  mapTipoFondo(valor: any): string {
    switch (valor) {
      case '1':
        return 'A';
      case '2':
        return 'B';
      case '3':
        return 'C';
      case '4':
        return 'D';
      case '5':
        return 'E';
      default:
        return ''; // Manejo de valores no mapeados
    }
  }

  descPensionMinima(codigo: string): string {
    switch (codigo) {
      case 'PENMINHM>=70':
        return 'Entre 70 y 74 años';
      case 'PENMINHM<70':
        return 'Menores de 70 años';
      case 'PENMINHM>=75':
        return 'Mayores de 74 años';
      default:
        return 'Descripción no disponible';
    }
  }

  descPensionBasica(desc: string): string {
    switch (desc) {
      case 'PENMINPBS':
        return 'Menor a 75 años';
      case 'PENMINPBS75':
        return 'Entre 75 y 79 años';
      case 'PENMINPBS80':
        return 'Mayor a 79 años';
      default:
        return 'Descripción no disponible';
    }
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  obtenerUniversos() {
    const segmentacion: any = this.getSegmentacion('universo');

    /*this.nuevopagoService
      .getUniverso({
        segmentacion: JSON.stringify(segmentacion),
        vlorUf: this.datosValoresUf.body.valorUF.valor,
      })
      .subscribe((response: any) => {
        const data = response.data;
        const detalleData = data.map((el: any) => {
          const actual = el;
          actual.toggle =
            this.pensionadosExcluidos.indexOf(actual.id) !== -1 ? true : false;
          return actual;
        });

        this.dataSource.data = detalleData;
        this.datosRegistros = this.dataSource.data.length > 0;
        this.registrosTotales = this.dataSource.data.length;

        this.cdRef.detectChanges();
      });*/
  }

  transformDate(date: any): string {
    if (date) {
      return date.replace(/-/g, '/');
    } else {
      return 'Fecha no Disponible';
    }
  }

  isObject(value: string) {
    const arrayRegex = /^\[.*\]$/;
    const objectRegex = /^\{.*\}$/;

    if (arrayRegex.test(value) || objectRegex.test(value)) return true;
    else return false;
  }

  handleLinkClick(event: Event): void {
    event.preventDefault(); // Evita la redirección predeterminada
  }

  async navigateToDetallePago(id: number): Promise<void> {
    await this.router.navigate(['home', 'ciclo-pago', 'detallepago', id]);
  }

  async navigateToHistorial() {
    await this.router.navigate(['home', 'ciclo-pago', 'pagodiario']);
  }

  loadSpinner() {
    /*const dialogRef = this.dialog.open(LoaderModalComponent, {
      data: {
        message: 'Creando Nuevo Ciclo',
      },
    });*/
    /*    dialogRef.afterClosed().subscribe((result) => {
          this.mensajeconfirmado = result;
        });
        setTimeout(() => {
          dialogRef.close(); // Cierra el modal después de 3 segundos
        }, 2000);*/
  }

  cambiarVista(vista: string) {
    this.paso = vista;
  }

  enableSeleccionTipos() {
    if (!this.seleccionadoPrimerPago) {
      this.showSeleccionTipos = false;
      this.seleccionadoTipos = false;
      this.opcionesTiposSeleccion = [{ opcion: '', valor: '' }];
      this.primerPagoTipo = '';
      this.selectedTipo = '';
      this.primerPagoSaldo = '';
      this.selectedSaldo = '';
    } else {
      this.showSeleccionTipos = true;
    }
  }

  cambiarSeleccionPrimerPag(event: any) {
    this.seleccionadoPrimerPago = event.checked;
    this.enableSeleccionTipos();
    this.actualizarEstadoUniverso();
  }

  cambiarSeleccionTras(event: any) {
    this.seleccionadoPensioTras = event.checked;
    this.enableSeleccionTipos();
    this.actualizarEstadoUniverso();
  }

  cambiarSeleccionReiter(event: any) {
    this.seleccionadoReiteracion = event.checked;
    this.enableSeleccionTipos();
    this.actualizarEstadoUniverso();
  }

  cambiarSeleccionBenefic(event: any) {
    this.seleccionadoBeneficios = event.checked;
    this.enableSeleccionTipos();
    this.actualizarEstadoUniverso();
  }

  actualizarEstadoUniverso() {
    if (
      this.seleccionadoSinSegmentacion ||
      this.seleccionadoPrimerPago ||
      this.seleccionadoPensioTras ||
      this.seleccionadoReiteracion ||
      this.seleccionadoBeneficios
    ) {
      this.enableUniverso = true;
    } else {
      this.enableUniverso = false;
    }
  }

  cambiarSeleccionTodos(event: any) {
    this.seleccionadoTodos = true;
    this.seleccionadoPrimerPago = event.checked;
    this.seleccionadoPensioTras = event.checked;
    this.seleccionadoReiteracion = event.checked;
    this.seleccionadoBeneficios = event.checked;
    this.enableSeleccionTipos();
  }

  cambiarSeleccionSinSegmentacion(event: any) {
    this.seleccionadoSinSegmentacion = event.checked;
    this.cleanUniverso();
    if (this.seleccionadoSinSegmentacion) {
      this.showSeleccionTipos = false;
      this.seleccionadoPrimerPago = !event.checked;
      this.seleccionadoPensioTras = !event.checked;
      this.seleccionadoReiteracion = !event.checked;
      this.seleccionadoBeneficios = !event.checked;
      this.enableUniverso = !event.checked;
      this.seleccionadoTipos = false;
      this.opcionesTiposSeleccion = [{ opcion: '', valor: '' }];
      this.primerPagoTipo = '';
      this.selectedTipo = '';
      this.primerPagoSaldo = '';
      this.selectedSaldo = '';
    }
    this.actualizarEstadoUniverso();
  }

  analizarSeleccion(event: any) {
    this.seleccionadoTipos = true;
    const valorSeleccionado = event.value;

    if (valorSeleccionado === 'Saldos') {
      this.opcionesTiposSeleccion = this.opcionesTiposSaldo;
      this.primerPagoTipo = 'Saldo';
    } else if (valorSeleccionado === 'Financiamientos') {
      this.opcionesTiposSeleccion = this.opcionesTiposFinancia;
      this.primerPagoTipo = 'Financiamiento';
    }

    this.selectedTipo = valorSeleccionado;
    this.enableUniverso = false;
  }

  ActualizarPrimerPagoSaldo(event: any) {
    const e = event;
    this.primerPagoSaldo = e.value.opcion;

    this.enableUniverso = true;
    this.selectedSaldo = e.value.valor;
    this.enableUniverso = true;
  }

  ActualizarTraspasadosSaldo(event: any) {
    const e = event;
    this.traspasadosSaldo = e.value;
    this.enableUniverso = true;
  }

  async cancelar() {
    await this.router.navigate(['ciclo-pago-front']);
  }

  onStepChange(): void {
    // cambiar color del título del paso
    const selectedLabels = this.el.nativeElement.querySelectorAll(
      '.mat-step-label-selected'
    );
    selectedLabels.forEach((label: any) => {
      this.renderer.setStyle(label, 'color', '#1D65B3');
    });

    setTimeout(() => {
      const iconElements = document.querySelectorAll(
        '[data-mat-icon-type="font"]'
      );

      iconElements.forEach((element: Element) => {
        if (element.textContent?.trim() === 'create') {
          element.textContent = 'done';
        }
      });
    }, 10);
  }

  exclusionPensionados(checked: boolean, pensionado: any) {
    const asociados = this.dataSource.data.filter(
      (el: any) => el.codibeneficio === pensionado.codibeneficio
    );

    asociados.forEach((asociado: any) => {
      const pensionadoOriginal = this.dataSource.data.find(
        (el: any) =>
          el.id === asociado.id &&
          el.nmrocuenta === asociado.nmrocuenta &&
          el.toggle !== checked
      );
      if (pensionadoOriginal) pensionadoOriginal.toggle = checked;
      if (checked) {
        this.pensionadosExcluidos.push(asociado.id);
      } else {
        this.pensionadosExcluidos = this.pensionadosExcluidos.filter(
          (id) => id !== asociado.id
        );
      }
    });
    const excluidosUnicos = new Set(this.pensionadosExcluidos);
    this.pensionadosExcluidos = Array.from(excluidosUnicos);
    this.totalPensionadosExcluidos = this.dataSource.data.filter(
      (el: any) => el.toggle
    ).length;
  }

  async generatePDF() {
    this.showLoading = true;
    let elementToCapture: any;
    let canvas: any;
    let imageData: any;
    const sectionsPrefixs: string[] = ['first', 'second', 'third'];
    const pdfContent: any[] = [];

    for (const prefix of sectionsPrefixs) {
      elementToCapture = document.getElementById(
        `${prefix}-parametros-section`
      );
      elementToCapture.querySelector('.alert')?.remove();
      canvas = await html2canvas(elementToCapture);
      imageData = canvas.toDataURL('image/png');
      pdfContent.push({ image: imageData, width: 500 });
    }

    const documentDefinition = {
      // header: 'Detalle de los Parámetros del Proceso de Pago',
      // style: 'sectionHeader',
      content: [
        {
          image: '',
          width: 100,
          alignment: 'right'
        },
        {
          text: 'Detalle de los Parámetros del Proceso de Pago',
          fontSize: 12,
          bold: true,
          alignment: 'center',
          margin: [0, -20, 0, 10],
          color: '#000000'
        },
        {
          text: `Fecha de Creación: ${this.fechaActual}`,
          fontSize: 6,
          style: ['quote', 'small'],
          margin: [0, 10, 0, 5] // Ajusta los márgenes según sea necesario
        },
        {
          text: `Usuario de Creación: ${this.responsable}`,
          // text: `Usuario de Creación: ${this.responsableName} ${this.responsableLastName} ( ${this.responsable} )`,
          fontSize: 6,
          style: ['quote', 'small'],
          margin: [0, 0, 0, 10] // Ajusta los márgenes según sea necesario
        },
        ...pdfContent
      ]
    };

    // Crear y descargar el PDF
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const fileName = `parametro-ciclo-${day}${month}${year}.pdf`;
    // const pdfDoc = pdfMake.createPdf(documentDefinition);
    // pdfDoc.download(fileName);
    this.showLoading = false;
  }

  getSegmentacion(type = 'creacion') {
    const segmentacion: any = {};

    if (this.seleccionadoSinSegmentacion) {
      segmentacion.segmentacion = this.getSegmentacionSin(type);
    } else {
      segmentacion.segmentacion = [];
      this.addSegmentacion(segmentacion, '1', this.seleccionadoPrimerPago);
      this.addSegmentacion(segmentacion, '4', this.seleccionadoPensioTras);
      this.addSegmentacion(segmentacion, '2', this.seleccionadoReiteracion);
      this.addSegmentacion(segmentacion, '3', this.seleccionadoBeneficios);
      this.addTipo(segmentacion);
      this.adjustSegmentacionForFinanciamientos(segmentacion);
    }

    return segmentacion;
  }

  getSegmentacionSin(type: string) {
    return type === 'creacion'
      ? [{ valor: 1 }, { valor: 2 }, { valor: 3 }, { valor: 4 }]
      : [{ valor: 0 }];
  }

  addSegmentacion(segmentacion: any, valor: string, condition: boolean) {
    if (condition) {
      segmentacion.segmentacion.push({ valor });
    }
  }

  addTipo(segmentacion: any) {
    if (
      !this.seleccionadoSinSegmentacion &&
      this.selectedTipo &&
      this.selectedSaldo
    ) {
      segmentacion.tipo = {
        tipo: this.selectedTipo,
        valor: this.selectedSaldo
      };
    }
  }

  adjustSegmentacionForFinanciamientos(segmentacion: any) {
    if (
      segmentacion?.tipo?.tipo === 'Financiamientos' &&
      segmentacion?.tipo?.valor === '3'
    ) {
      segmentacion.segmentacion[0].valor = '5';
    }
  }

  async ajustarAnchoColumnas(sheet: any) {
    sheet.columns.forEach((column: any) => {
      let maxLength = 0;

      column.eachCell({ includeEmpty: true }, (cell: any) => {
        const cellLength = cell.value ? cell.value.toString().length : 0;
        if (cellLength > maxLength) {
          maxLength = cellLength + 3;
        }
      });

      column.width = maxLength < 10 ? 10 : maxLength; // Ajustar a un mínimo, por ejemplo 10
    });
  }

  /*downloadReport() {
    this.showLoading = true;
    let segmentacion: any = this.getSegmentacion('universo');
    this.nuevopagoService
      .getReporteNovedades({
        segmentacion: JSON.stringify(segmentacion),
        vlorUf: this.datosValoresUf.body.valorUF.valor,
      })
      .subscribe(async (response: any) => {
        const fileData = response.data;

        const columnOrder = [
          { key: 'Excluido', title: 'Excluido' },
          { key: 'tiponovedad', title: 'Tipo de Novedad' },
          { key: 'tipohaber', title: 'Tipo de Haber' },
          { key: 'coditipohaber', title: 'Código Haber' },
          { key: 'fechiniciohaber', title: 'Fecha Inicio Haber' },
          { key: 'fechfinhaber', title: 'Fecha Término Haber' },
          { key: 'mntohaber', title: 'Monto Haber' },
          { key: 'cuotareitaobl', title: 'Cuotas Obligatorio' },
          { key: 'cuotareitavol', title: 'Cuotas Voluntario' },
          { key: 'cuotareitaconv', title: 'Cuotas Convenido' },
          { key: 'codicargoreiteracion', title: 'Código de Cargo Reiteración' },
          { key: 'rutcausante', title: 'Rut Causante' },
          { key: 'nombrecausante', title: 'Nombre Causante' },
          { key: 'rutbps', title: 'Rut BPS' },
          { key: 'nombrebps', title: 'Nombre BPS' },
          { key: 'nmrocuenta', title: 'Número Cuenta' },
          { key: 'porcentajepension', title: '% Pensión BPS' },
          { key: 'tipobeneficio', title: 'Tipo de Beneficio' },
          { key: 'modalidadbeneficio', title: 'Modalidad Beneficio' },
          { key: 'tipopago', title: 'Tipo de Pago' },
          { key: 'fechrecepcion', title: 'Fecha de Recepción' },
          { key: 'indcbonificacion', title: 'Bonificación de salud' },
          { key: 'sobrevivenciaerror', title: 'Error en grupo familiar' },
          { key: 'vigenciabps', title: 'Vigencia BPS' },
          { key: 'estadonovedad', title: 'Estado de Novedad' },
          { key: 'fechaprobacion', title: 'Fecha de Aprobación' },
          { key: 'nmrobeneficio', title: 'Nmro. de Beneficio' },
          { key: 'vigenciafinanciamiento', title: 'Vigencia Financiamiento' },
          { key: 'financiamiento', title: 'Financiamiento' },
          { key: 'modalidadfinanciamiento', title: 'Modalidad Financiamiento' },
          { key: 'porcentajededuccion', title: '% Deducción GE' },
          { key: 'tipoajuste', title: 'Tipo de Ajuste' },
          { key: 'fechajuste', title: 'Fecha de Ajuste' },
          { key: 'mntopensiondism', title: 'Monto Pensión Disminuida' },
          { key: 'fechainicio', title: 'Fecha de Inicio' },
          { key: 'fechatermino', title: 'Fecha de Término' },
          { key: 'pensionobligatoria', title: 'Pensión Obligatoria - CCICO' },
          {
            key: 'pensiondepositosconv',
            title: 'Pensión Depósitos Convenidos - CCIDC',
          },
          {
            key: 'pensioncotizacionesvol',
            title: 'Pensión Cotizaciones Voluntarias - CCICV',
          },
          {
            key: 'pensionahorrovolcol',
            title: 'Pensión Ahorro Voluntario Colectivo - CAPVC',
          },
          {
            key: 'pensionafiliadovol',
            title: 'Pensión Afiliado Voluntario - CCIAV',
          },
          { key: 'pensioncia', title: 'Monto Pensión Compañía de Seguros' },
          { key: 'p1ccico', title: 'P1-CCICO' },
          { key: 'p2ccidc', title: 'P2-CCIDC' },
          { key: 'p3ccicva', title: 'P3-CCICVA' },
          { key: 'p4ccicvb', title: 'P4-CCICVB' },
          { key: 'p5capvca', title: 'P5-CAPVCA' },
          { key: 'p6capvcb', title: 'P6-CAPVCB' },
          { key: 'p7cciav', title: 'P7-CCIAV' },
          { key: 'p8ciccoafc', title: 'P8-CICCO-AFC' },
          { key: 'p9ciccocav', title: 'P9-CICCO-CAV' },
          { key: 'montototalpension', title: 'Monto total Pensión' },
          { key: 'usuariocreacion', title: 'Usuario Creación' },
          { key: 'fechcreacion', title: 'Fecha de Creación' },
          { key: 'usuariomodificacion', title: 'Usuario Modificación' },
          { key: 'fechamodificacion', title: 'Fecha de Modificación' },
          { key: 'fechaultimopago', title: 'Fecha Último Pago' },
          { key: 'fechadevengamiento', title: 'Fecha de Devengamiento' },
          { key: 'lugarpago', title: 'Lugar de Pago' },
          { key: 'mediopago', title: 'Medio de Pago' },
          { key: 'tipocuenta', title: 'Tipo de Cuenta' },
          { key: 'bancodeposito', title: 'Banco de Depósito' },
          { key: 'sucursalpago', title: 'Sucursal de Pago' },
          { key: 'cuentadeposito', title: 'Cuenta de Depósito' },
          { key: 'descerrorusuario', title: 'Descripción del Error' },
          { key: 'descerror', title: 'Descripción del Error Técnico' },
        ];

        const newData = fileData.map((item: any) => {
          const tableItem = this.dataSource.data.find(
            (el: any) => el.id === item.id
          );
          const newItem: any = {};
          columnOrder.forEach(({ key, title }) => {
            if (key === 'Excluido') {
              newItem[title] = tableItem?.toggle ? 'Sí' : 'No';
            } else {
              let value = item[key];
              value = this.obtenerValueKey(value, key);
              newItem[title] = value;
            }
          });
          return newItem;
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Novedades');

        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const fechaActual = `${day}/${month}/${year}`;

        worksheet.addRow(['Fecha:', fechaActual, '', '', '']).font = {
          bold: true,
        };
        worksheet.addRow(['Usuario: ', this.nombreUsuario, '', '', '']).font = {
          bold: true,
        };

        const columnHeaders = columnOrder.map((column) => column.title);
        const headerRow = worksheet.addRow(columnHeaders);
        headerRow.font = { bold: true };
        headerRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '92D050' },
        };

        newData.forEach((dataRow: any) => {
          const rowValues = columnHeaders.map((header) => dataRow[header]);
          worksheet.addRow(rowValues);
        });

        worksheet.getCell('A1').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFC0C0' },
        };
        worksheet.getCell('A2').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFC0C0' },
        };

        this.ajustarAnchoColumnas(worksheet);

        // Escribir el archivo Excel
        const buffer = await workbook.xlsx.writeBuffer();

        // Descargar el archivo Excel
        const blob = new Blob([buffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const dateReport = new Date()
          .toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          .replace(/\//g, '');
        saveAs(blob, `UniversoNuevosPagos_${dateReport}.xlsx`);

        this.showLoading = false;
      });
  }*/
  downloadReport() {}

  obtenerValueKey(value: any, key: any) {
    let aux = value;
    if (key === 'indcbonificacion' || key === 'sobrevivenciaerror') {
      if (value === 'Y') {
        aux = 'Si';
      } else {
        aux = 'No';
      }
    }
    return aux;
  }

  calcFlexBasis(arrayLength: number): string {
    const porcentaje = 80 / arrayLength; // Calcula el porcentaje basado en la cantidad de elementos
    // return `calc(${porcentaje}% - 5px) !important`;
    return `flex-basis: calc(${porcentaje}% - 5px) !important;`;
  }

  llamarAlPdf() {
    this.showLoading = true;
    this.pdfVisible = true;

    setTimeout(async () => {
      await this.generateTOpdf();
    }, 1000);
  }

  async generateTOpdf() {}

  /*async generateTOpdf() {
    try {
      const scale = 2; // Ajusta según tus necesidades

      const container = document.getElementById('pdf');

      if (container instanceof HTMLElement) {
        const canvas = await html2canvas(container, { scale: scale });

        const imageData = canvas.toDataURL('image/png');

        const documentDefinition = {
          content: [
            {
              image: imageData,
              width: 500,
            },
          ],
        };

        // Crear y descargar el PDF
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const fileName = `parametro-ciclo-${day}${month}${year}.pdf`;

        const pdfDoc = pdfMake.createPdf(documentDefinition);
        pdfDoc.download(fileName);
        this.pdfVisible = false;
      } else {
        this.pdfVisible = false;
        console.error(
          'No se encontró el contenedor .container en el HTML generado.'
        );
      }
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      this.pdfVisible = false;
    }
    this.showLoading = false;
  }*/

  formatearMontoPesosParametros(monto: any) {
    // return MontoUtil.crearStringMontoPesosParametros(Number(monto));
  }

  formatearMontoPesosDecimal(monto: any) {
    // return MontoUtil.crearStringMontoUF(Number(monto));
  }

  formatearMontoUF(monto: any) {
    // return MontoUtil.crearStringMontoUFParametros(Number(monto));
  }

  obtenerFechaParametroValorUfSalud(datosValoresUf: any) {
    let value = '';
    value = datosValoresUf.body.valorUfSalud.fechaParametro
      ? this.transformDate(datosValoresUf.body.valorUfSalud.fechaParametro)
      : 'Sin Información';
    return value;
  }

  obtenerValorUfSalud(datosValoresUf: any) {
    const value = '';
    /*    value = datosValoresUf.body.valorUfSalud.valor
          ? this.formatearMontoPesosParametros(
            datosValoresUf.body.valorUfSalud.valor
          )
          : 'Sin Información';*/
    return value;
  }

  obtenerFechaParametroValorUF(datosValoresUf: any) {
    let value = '';
    value = datosValoresUf.body.valorUF.fechaParametro
      ? this.transformDate(datosValoresUf.body.valorUF.fechaParametro)
      : 'Sin Información';
    return value;
  }

  obtenerValorUF(datosValoresUf: any) {
    const value = '';
    /*    value = datosValoresUf.body.valorUF.valor
          ? this.formatearMontoPesosParametros(datosValoresUf.body.valorUF.valor)
          : 'Sin Información';*/
    return value;
  }

  getFechaUFSalud(datosValoresUf: any, opcion: number) {
    let value = '';
    if (
      datosValoresUf &&
      datosValoresUf.body &&
      datosValoresUf.body.valorUfSalud &&
      datosValoresUf.body.valorUF
    ) {
      switch (opcion) {
        case 1:
          value = this.obtenerFechaParametroValorUfSalud(datosValoresUf);
          break;
        case 2:
          value = this.obtenerValorUfSalud(datosValoresUf);
          break;
        case 3:
          value = this.obtenerFechaParametroValorUF(datosValoresUf);
          break;
        case 4:
          value = this.obtenerValorUF(datosValoresUf);
          break;
        default:
          break;
      }
    } else {
      value = 'Sin Información';
    }
    return value;
  }

  getMinimos(datosValoresIngreso: any, opcion: number) {
    const value = '';
    /*if (datosValoresIngreso && datosValoresIngreso.body) {
      switch (opcion) {
        case 1:
          value = datosValoresIngreso.body.ingresoMinimo
            ? this.formatearMontoPesosParametros(
              datosValoresIngreso.body.ingresoMinimo
            )
            : 'Sin Información';
          break;
        case 2:
          value = datosValoresIngreso.body.ingMinSinIncremento
            ? this.formatearMontoPesosParametros(
              datosValoresIngreso.body.ingMinSinIncremento
            )
            : 'Sin Información';
          break;
        case 3:
          value = datosValoresIngreso.body.sueldoVital
            ? this.formatearMontoPesosParametros(
              datosValoresIngreso.body.sueldoVital
            )
            : 'Sin Información';
          break;
        default:
          break;
      }
    } else {
      value = 'Sin Información';
    }*/
    return value;
  }
}
