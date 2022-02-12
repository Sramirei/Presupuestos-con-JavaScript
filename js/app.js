const Ingresos = [
    new Ingreso('salario', 2100.00),
    new Ingreso ('Venta Coche', 16000)
];

const Egresos = [
    new Egreso ('Renta Departamento', 1000),
    new Egreso ( 'Comprar Ropa', 400)
];

///////////////////////
let cargarApp = () =>{
cargarCabecero();
cargarIngresos();
cargarEgresos();

}


/////////////////////
let totalIngresos = () =>{
    let totalIngreso = 0;
    for (let Ingreso of Ingresos){
        totalIngreso += Ingreso.valor;
    }
    return totalIngreso;
}

/////////////////////////////


let totalEgresos = () =>{

     let totalEgreso = 0;
     for (let egreso of Egresos){
         totalEgreso += egreso.valor;

         return totalEgreso;
     }
}

////////////////////
let cargarCabecero = () =>{
let presupuesto = totalIngresos() - totalEgresos();
let porcentajeEreso = totalEgresos()/totalIngresos();
document.getElementById('Presupuesto').innerHTML = formatoMoneda(presupuesto);
document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEreso);
document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}


const formatoMoneda =(valor)=> {
return valor.toLocaleString('es-CO', {style : 'currency', currency:'COP', minimumFractionDigits: 2});
}

const formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('es-CO', {style:'percent', minimumFractionDigits: 2});
}


//////////////////

const cargarIngresos = () =>{

    let ingresosHTML = '';
    for (let ingreso of Ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);

        document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
    }
}


const crearIngresoHTML = (ingreso) => {

    let ingresosHTML = `

    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name='close-outline' 
                onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
    </div>
    `;

    return ingresosHTML;
}

const eliminarIngreso = (id) =>{

    let inidiceEliminar = Ingresos.findIndex(ingreso => ingreso.id === id);
    Ingresos.splice(inidiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}


const cargarEgresos = () =>{
    let egresosHTML ='';
    for (let egreso of Egresos){
        egresosHTML += crearEgresoHTML(egreso);

        document.getElementById('lista-egresos').innerHTML = egresosHTML;
    }
}


const crearEgresoHTML = (egreso) =>{
    let egresosHTML = `
    
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">29</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name='close-outline'
                                onclick = 'eliminarEgresos(${egreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
    `;
    return egresosHTML;
}

const eliminarEgresos = (id) =>{

    let inidiceEliminar = Egresos.findIndex(egreso => egreso.id === id);
    Egresos.splice(inidiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}


const agregarDato = () =>{
    let formulario = document.forms['formulario'];

    let tipo = formulario['tipo'];
    let descripcion = formulario['descripcion'];
    let valor = formulario['valor'];

    if (descripcion.value !== '' && valor.value !==''){

        if (tipo.value === 'ingreso'){

            Ingresos.push (new Ingreso (descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();

        } else if (tipo.value === 'egreso'){

            Egresos.push (new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}