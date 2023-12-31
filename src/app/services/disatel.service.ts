/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { Data } from '../interfaces/Data';

const disatelUrl = environment.disatelUrl;
const disatelEjecutar = environment.disatelEjecutar;
const fotoVehiculo = environment.fotoVehiculo;
const fotoOrden = environment.fotoOrden;
const fotoDispositivo = environment.fotoDispositivo;
const notification = environment.notification;
const coordenadas = environment.coordenadas;
const otEmergente = environment.otEmergente;

@Injectable({
  providedIn: 'root'
})
export class DisatelService {

  data: object = null;
  datosUsuario;

  constructor(private http: HttpClient, private storage: Storage) {}

  async executeApi<T>( endpoint ){
    return this.http.get<T>(endpoint);
  }

  async getOrdenesTrabajo<T>( usuario, tipo ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(this.datosUsuario);
    console.log(`gt.disatel.app${disatelUrl}ordenes_asignadas&usuario=${usuario}&tipo=${tipo}`);
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}ordenes_asignadas&usuario=${usuario}&tipo=${tipo}`);
  }

  async getOrdenesTrabajoEspeciales<T>( usuario ){
    console.log(`https://gt.disatel.app/ROOT/API/API_ot_ver_emergente.php?request=ordenes_especiales&usuario=${usuario}`);
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ver_emergente.php?request=ordenes_especiales&usuario=${usuario}`);
  }

  // nuevas rutas

  async getOrdenTrabajo<T>( ot, solicitud ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${disatelUrl}orden&vehiculo=${ot}&solicitud=${solicitud}`);
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}orden&vehiculo=${ot}&solicitud=${solicitud}`);
  }

  async getVehiculo<T>( vehiculo, solicitud ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${disatelUrl}vehiculos&vehiculo=${vehiculo}&ot=${solicitud}`);
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}vehiculos&vehiculo=${vehiculo}&ot=${solicitud}`);
  }

  async geServicios<T>( vehiculo, solicitud ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}servicios&vehiculo=${vehiculo}&solicitud=${solicitud}`);
  }

  async geTecnicos<T>( ot ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}tecnicos&ot=${ot}`);
  }

  async getAccesorios<T>( ot, vehiculo ){
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}accesorios&ot=${ot}&vehiculo=${vehiculo}`);
  }

  async getCheclist<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}checklist`);
  }

  async respondeChecklist<T>(solicitud,vehiculo,valor,pregunta){
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}responde_checklist&solicitud=${solicitud}&vehiculo=${vehiculo}&pregunta=${pregunta}&valor=${valor}`);
  }

  async respondeChecklistEmergente<T>(solicitud,vehiculo,valor,pregunta){
    console.log(`https://gt.disatel.app/ROOT/API/API_ot_ejecutar_emergente.php?request=responde_checklist&ot=${solicitud}&vehiculo=${vehiculo}&pregunta=${pregunta}&valor=${valor}`)
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ejecutar_emergente.php?request=responde_checklist&ot=${solicitud}&vehiculo=${vehiculo}&pregunta=${pregunta}&valor=${valor}`);
  }

  async iniciaChecklist<T>(solicitud,vehiculo,entrega,fechaHora){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}inicia_checklist&solicitud=${solicitud}&vehiculo=${vehiculo}&entrega=${entrega}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
  }

  //

  async ejecutarOT<T>( ot, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}salir&ot=${ot}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async presente<T>( solicitud, vehiculo, observaciones, fechaHora, longitud, latitud ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${disatelEjecutar}presente&solicitud=${solicitud}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}&longitud=${longitud}&latitud=${latitud}`);
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}presente&solicitud=${solicitud}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}&longitud=${longitud}&latitud=${latitud}`);
  }

  async finalizarOrden<T>( ot, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}finalizar&ot=${ot}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async ordenFallida<T>( ot, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${disatelEjecutar}fallida&ot=${ot}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}fallida&ot=${ot}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async ordenCancelada<T>( ot, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}cancelar&ot=${ot}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async iniciarVehículo<T>( solicitud, vehiculo, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}iniciarVehiculo&solicitud=${solicitud}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async finalizarVehículo<T>( solicitud, vehiculo, observaciones, fechaHora, recibe){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}finalizarVehiculo&solicitud=${solicitud}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}&recibe=${recibe}`);
  }

  async solicitarPruebas<T>( ot, vehiculo, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}solicitarPruebas&ot=${ot}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&fecha_hora=${fechaHora}`);
  }

  async solicitarAseguramiento<T>( ot, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}solicitar_aseguramiento&ot=${ot}&usuario=${this.datosUsuario.codigo}&fecha_hora=${fechaHora}&observaciones=${observaciones}`);
  }

  async fallidoVehículo<T>( solicitud, vehiculo, observaciones,  fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${disatelEjecutar}fallidoVehiculo&solicitud=${solicitud}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}fallidoVehiculo&solicitud=${solicitud}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async cancelarVehículo<T>( solicitud, vehiculo, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}cancelarVehiculo&solicitud=${solicitud}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async seleccionarSim<T>( ot, vehiculo, sim, fechaHora, equipo ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${disatelEjecutar}selecciona_sim&solicitud=${ot}&sim=${sim}&equipo=${equipo}&vehiculo=${vehiculo}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}selecciona_sim&solicitud=${ot}&sim=${sim}&equipo=${equipo}&vehiculo=${vehiculo}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
  }

  async seleccionarEquipo<T>( ot, vehiculo, equipo, fechaHora, ubicacion ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${disatelEjecutar}selecciona_equipo&solicitud=${ot}&vehiculo=${vehiculo}&equipo=${equipo}&ubicacion=${ubicacion}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}selecciona_equipo&solicitud=${ot}&vehiculo=${vehiculo}&equipo=${equipo}&ubicacion=${ubicacion}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
  }

  async deseleccionarEquipo<T>( ot, vehiculo, equipo, fechaHora, despacho ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${disatelEjecutar}desinstalacion_equipo&solicitud=${ot}&vehiculo=${vehiculo}&equipo=${equipo}&fecha_hora=${fechaHora}&despacho=${despacho}&usuario=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}desinstalacion_equipo&solicitud=${ot}&vehiculo=${vehiculo}&equipo=${equipo}&fecha_hora=${fechaHora}&despacho=${despacho}&usuario=${this.datosUsuario.codigo}`);
  }

  async deseleccionarEquipoE<T>( ot, equipo, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/ROOT/API/API_ot_ejecutar_emergente.php?request=desinstalacion_equipo&ot=${ot}&equipo=${equipo}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ejecutar_emergente.php?request=desinstalacion_equipo&ot=${ot}&equipo=${equipo}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
  }

  async desinstalarSim<T>( ot, vehiculo, sim, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${disatelEjecutar}desinstalacion_sim&solicitud=${ot}&sim=${sim}&vehiculo=${vehiculo}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`)
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}desinstalacion_sim&solicitud=${ot}&sim=${sim}&vehiculo=${vehiculo}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
  }

  async desinstalarSimE<T>( ot, sim, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/ROOT/API/API_ot_ejecutar_emergente.php?request=desinstalacion_sim&ot=${ot}&sim=${sim}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`)
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ejecutar_emergente.php?request=desinstalacion_sim&ot=${ot}&sim=${sim}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
  }

  async postFotoVehiculo<T>( ot, vehiculo, file, titulo ){
    const fd = new FormData();
    fd.append('image', file, file.name);
    this.datosUsuario = await this.storage.get('datos');
    return this.http.post(`https://gt.disatel.app/${fotoVehiculo}&ot=${ot}&vehiculo=${vehiculo}&titulo=${titulo}&usuario=${this.datosUsuario.codigo}`, fd);
  }

  async postFotoChecklist<T>( ot, vehiculo, file, codigo ){
    const fd = new FormData();
    fd.append('image', file);
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${fotoVehiculo}&ot=${ot}&vehiculo=${vehiculo}&titulo=${codigo}&usuario=${this.datosUsuario.codigo}`);
    return this.http.post(`https://gt.disatel.app/${fotoVehiculo}&ot=${ot}&vehiculo=${vehiculo}&titulo=${codigo}&usuario=${this.datosUsuario.codigo}`, fd);
  }

  async postFoto<T>( solicitud, vehiculo, file, titulo ){
    const fd = new FormData();
    fd.append('image', file, file.name);
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${fotoVehiculo}solicitud=${solicitud}&vehiculo=${vehiculo}&titulo=${titulo}&usuario=${this.datosUsuario.codigo}`, fd);
    return this.http.post(`https://gt.disatel.app/${fotoVehiculo}solicitud=${solicitud}&vehiculo=${vehiculo}&titulo=${titulo}&usuario=${this.datosUsuario.codigo}`, fd);
  }

  async postFotoEmergentes<T>( solicitud, vehiculo, file, titulo ){
    const fd = new FormData();
    fd.append('image', file, file.name);
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/ROOT/API/API_imagen_emergente.php?ot=${solicitud}&vehiculo=${vehiculo}&titulo=${titulo}&usuario=${this.datosUsuario.codigo}`, fd);
    return this.http.post(`https://gt.disatel.app/ROOT/API/API_imagen_emergente.php?ot=${solicitud}&vehiculo=${vehiculo}&titulo=${titulo}&usuario=${this.datosUsuario.codigo}`, fd);
  }

  async postFotoDispositivo<T>( solicitud, vehiculo, file, titulo ){
    const fd = new FormData();
    fd.append('image', file, file.name);
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${fotoDispositivo}solicitud=${solicitud}&vehiculo=${vehiculo}&titulo=${titulo}&usuario=${this.datosUsuario.codigo}`, fd);
    return this.http.post(`https://gt.disatel.app/${fotoDispositivo}solicitud=${solicitud}&vehiculo=${vehiculo}&titulo=${titulo}&usuario=${this.datosUsuario.codigo}`, fd);
  }

  async postFirma<T>( ot, vehiculo, file){
    const fd = new FormData();
    fd.append('image', file, file.name);
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app//ROOT/API/API_imagen_vehiculo.php?solicitud=${ot}&vehiculo=${vehiculo}&titulo=11&usuario=${this.datosUsuario.codigo}`, fd);
    return this.http.post(`https://gt.disatel.app/ROOT/API/API_imagen_vehiculo.php?solicitud=${ot}&vehiculo=${vehiculo}&titulo=11&usuario=${this.datosUsuario.codigo}`, fd);
  }

  async postFirmaEmergente<T>( ot, vehiculo, file){
    const fd = new FormData();
    fd.append('image', file, file.name);
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app//ROOT/API/API_imagen_emergente.php?solicitud=${ot}&vehiculo=${vehiculo}&titulo=11&usuario=${this.datosUsuario.codigo}`, fd);
    return this.http.post(`https://gt.disatel.app/ROOT/API/API_imagen_emergente.php?solicitud=${ot}&vehiculo=${vehiculo}&titulo=11&usuario=${this.datosUsuario.codigo}`, fd);
  }

  async eliminarFotoOt<T>( ot, vehiculo, codigos ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}deleteimagen&ot=${ot}&vehiculo=${vehiculo}&codigos=${codigos}`);
  }

  async eliminarFotoVehiculo<T>(ot, codigos){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}deleteimagenVehiculo&ot=${ot}&codigos=${codigos}`);
  }

  async getLista<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}titulos_imagenes_vehiculos`);
  }

  async getListaVehiculos<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}titulos_imagenes_vehiculos`);
  }

  async getInterirores<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}checklist`);
  }

  async getTitulosImagenes<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}titulos_imagenes_checklist`);
  }

  async getTitulosImagenesMoviles<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/APP/API_ot_ver.php?request=titulos_imagenes_moviles`);
  }

  async getEquiposAIstalar<T>(ot){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}equiposAInstalar&solicitud=${ot}&usuario=${this.datosUsuario.codigo}`);
  }

  async getEquipo<T>(ot, equipo){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${disatelUrl}equipos&ot=${ot}&equipo=${equipo}`);
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}equipos&ot=${ot}&equipo=${equipo}`);
  }

  async getSims<T>(ot){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}simsAInstalar&solicitud=${ot}&usuario=${this.datosUsuario.codigo}`);
  }

  async getSimsSolicitud<T>(ot){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}sims&solicitud=${ot}`);
  }

  async getSim<T>(ot, sim){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ver.php?request=get_sim&solicitud=${ot}&sim=${sim}`);
  }

  async getEquiposDestinadosSolicitud<T>(ot){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}equipos&solicitud=${ot}`);
  }

  async setChecklist<T>( ot, vehiculo, entrega, fechahora){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}finaliza_checklist&ot=${ot}&vehiculo=${vehiculo}&entrega=${entrega}&usuario=${this.datosUsuario.codigo}&fecha_hora=${fechahora}`);
  }

  async cuestionarioVisita<T>(respuestas, ot){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}finaliza_cuestinario_visita&resultado=${respuestas}&ot=${ot}`);
  }

  async finalizaVisita<T>(ot, reportado, encontrado, solucion, observacion, recibe, internas, fechahora, vehiculo){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${disatelEjecutar}finalizarVehiculo&solicitud=${ot}&vehiculo=${vehiculo}&recibe=${recibe}&reportado=${reportado}&encontrado=${encontrado}&solucion=${solucion}&observacion=${observacion}&internas=${internas}&usuario=${this.datosUsuario.codigo}&fecha_hora=${fechahora}`);
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}finalizarVehiculo&solicitud=${ot}&vehiculo=${vehiculo}&recibe=${recibe}&reportado=${reportado}&encontrado=${encontrado}&solucion=${solucion}&observacion=${observacion}&internas=${internas}&usuario=${this.datosUsuario.codigo}&fecha_hora=${fechahora}`);
  }

  async registrarVisualizacion<T>(ot){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelEjecutar}registrar_visualizacion&ot=${ot}&usuario=${this.datosUsuario.codigo}`);
  }

  async getEquiposInstalados<T>(ot, vehiculo){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${disatelUrl}equipo_instalado&solicitud=${ot}&vehiculo=${vehiculo}`);
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}equipo_instalado&solicitud=${ot}&vehiculo=${vehiculo}`);
  }

  // NOTIFICAIONES

  async registrarDispositivo<T>( deviceId, token){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${notification}register&user_id=${this.datosUsuario.codigo}&device_id=${deviceId}&device_token=${token}&device_type=android&certificate_type=1`);
  }

  async quitarDispositivo<T>( deviceId, token){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${notification}unregister&user_id=${this.datosUsuario.codigo}&device_id=${deviceId}&device_token=${token}&device_type=android&certificate_type=1`);
  }

  async listNotifications<T>(page){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${notification}list&user_id=${this.datosUsuario.codigo}type=&page=
                            ${page}`);
  }

  //OTs emerjentes

  async getSedes<T>(){
    return this.http.get<T>('https://gt.disatel.app/ROOT/API/API_ot_ver_emergente.php?request=sedes');
  }

  async getClientes<T>(cliente){
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ver_emergente.php?request=clientes&cliente=${cliente}`);
  }

  async getTrabajos<T>(){
    return this.http.get<T>('https://gt.disatel.app/ROOT/API/API_ot_ver_emergente.php?request=trabajos');
  }

  async nuevaOtEmergente<T>( sede, cliente, fechaHora, placa, trabajo, justificacion, vehiculo ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${otEmergente}emergente&sede=${sede}&cliente=${cliente}&fecha_hora=${fechaHora}&placa=${placa}&trabajo=${trabajo}&vehiculo=${vehiculo}&justificacion=${justificacion}&usuario=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`https://gt.disatel.app/${otEmergente}emergente&sede=${sede}&cliente=${cliente}&fecha_hora=${fechaHora}&placa=${placa}&trabajo=${trabajo}&vehiculo=${vehiculo}&justificacion=${justificacion}&usuario=${this.datosUsuario.codigo}`);
  }

  async otEmergente<T>( ot, vehiculo ){
    console.log(`https://gt.disatel.app/ROOT/API/API_ot_ver_emergente.php?request=orden_emergente&ot=${ot}&vehiculo=${vehiculo}`)
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ver_emergente.php?request=orden_emergente&ot=${ot}&vehiculo=${vehiculo}`);
  }

  async getEquiposDisponibles<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ver_emergente.php?request=equipos_disponibles&usuario=${this.datosUsuario.codigo}`);
  } 

  async getSimsDisponibles<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ver_emergente.php?request=sims_disponibles&usuario=${this.datosUsuario.codigo}`);
  } 

  async getChecklistEmergentes<T>(ot){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ver_emergente.php?request=checklist&ot=${ot}`);
  }

  async getTitulosImagenesEmergentes<T>(ot){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ver_emergente.php?request=titulo_imagenes&ot=${ot}`);
  }

  async iniciaChecklistEmergente<T>(ot,vehiculo,entrega,fechaHora){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ejecutar_emergente.php?request=inicia_checklist&ot=${ot}&vehiculo=${vehiculo}&entrega=${entrega}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
  }

  async seleccionarEquipoEmergente<T>( ot, vehiculo, equipo, imei, fechaHora, ubicacion ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/${otEmergente}selecciona_equipo&ot=${ot}&vehiculo=${vehiculo}&equipo=${equipo}&imei=${imei}&ubicacion=${ubicacion}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`https://gt.disatel.app/${otEmergente}selecciona_equipo&ot=${ot}&vehiculo=${vehiculo}&equipo=${equipo}&imei=${imei}&ubicacion=${ubicacion}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
  }

  async getEquiposInstaladosEmergentes<T>(ot){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ver_emergente.php?request=equipo_instalado&ot=${ot}`);
  }

  async iniciaOTEmergente<T>( ot, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${otEmergente}inicia_emergente&ot=${ot}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async finOTEmergente<T>( ot, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${otEmergente}finEmergente&ot=${ot}&usuario=${this.datosUsuario.codigo}&fecha_hora=${fechaHora}`);
  }

  async seleccionarSimEmergente<T>( ot, sim, fechaHora, equipo, linea ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${otEmergente}selecciona_sim&ot=${ot}&sim=${sim}&equipo=${equipo}&linea=${linea}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
  }

  async validarPlaca<T>( placa, cliente){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ver_emergente.php?request=ver_vehiculo&placa=${placa}&cliente=${cliente}`);
  }

  async equiposAnteriormenteInstalados<T>( vehiculo, ot){
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ver.php?request=equipo_instalado_vehiculo&solicitud=${ot}&vehiculo=${vehiculo}`);
  }

  async getUsuarios<T>(){
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ver.php?request=usuarios_bodega`);
  }

  async entregaBodega<T>( usuarioB, resultado, fechah){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/ROOT/API/API_ot_ejecutar.php?request=entregar_bodega&usuario_bodega=${usuarioB}&equipos_sims=${resultado}&fecha_hora=${fechah}&usuario=${this.datosUsuario.codigo}`)
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ejecutar.php?request=entregar_bodega&usuario_bodega=${usuarioB}&equipos_sims=${resultado}&fecha_hora=${fechah}&usuario=${this.datosUsuario.codigo}`);
  }

  async escanearDato<T>( tipo, dato, fechah){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://gt.disatel.app/ROOT/API/API_ot_ejecutar.php?request=escanear_dato&tipo=${tipo}&dato=${dato}&fecha_hora=${fechah}&usuario=${this.datosUsuario.codigo}`)
    return this.http.get<T>(`https://gt.disatel.app/ROOT/API/API_ot_ejecutar.php?request=escanear_dato&tipo=${tipo}&dato=${dato}&fecha_hora=${fechah}&usuario=${this.datosUsuario.codigo}`);
  }
  

  async getImagenesSubidas<T>( solicitud, vehiculo ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://gt.disatel.app/${disatelUrl}imagenes_vehiculo&solicitud=${solicitud}&vehiculo=${vehiculo}`);
  }

}
