| package |
package := Package name: 'Floreriabro'.
package paxVersion: 1;
	basicComment: ''.


package classNames
	add: #Flor;
	add: #Floreria;
	add: #FueraRosario;
	add: #ItemRamo;
	add: #Pedido;
	add: #Persona;
	yourself.

package binaryGlobalNames: (Set new
	yourself).

package globalAliases: (Set new
	yourself).

package setPrerequisites: #(
	'C:\Users\Sefo\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin'
	'C:\Users\Sefo\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin Legacy Date & Time'
	'C:\Users\Sefo\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin Message Box'
	'C:\Users\Sefo\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\MVP\Presenters\Prompters\Dolphin Prompter').

package!

"Class Definitions"!

Object subclass: #Flor
	instanceVariableNames: 'codigo descripcion precio'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Floreria
	instanceVariableNames: 'flores personas pedidos'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #ItemRamo
	instanceVariableNames: 'flor cant'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Pedido
	instanceVariableNames: 'nroOrden fecha remitente destinatario ramo total'
	classVariableNames: 'ProximoCodigo'
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Object subclass: #Persona
	instanceVariableNames: 'dni ape nom direccion localidad telefono'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Pedido subclass: #FueraRosario
	instanceVariableNames: ''
	classVariableNames: 'RecargoEnvio'
	poolDictionaries: ''
	classInstanceVariableNames: ''!

"Global Aliases"!


"Loose Methods"!

"End of package definition"!

"Source Globals"!

"Classes"!

Flor guid: (GUID fromString: '{4f31b030-7844-4d79-81a1-8f5b89ca3866}')!
Flor comment: ''!
!Flor categoriesForClass!Kernel-Objects! !
!Flor methodsFor!

cargaDatos
codigo:=(Prompter prompt: 'Ingresar codigo de flor') asNumber.
descripcion:=(Prompter prompt: 'Ingresar una descripcion breve').
precio:=(Prompter prompt: 'Ingrese precio unitario') asNumber.!

codigo
	^codigo!

codigo: anObject
	codigo := anObject!

descripcion
	^descripcion!

descripcion: anObject
	descripcion := anObject!

mostrarDatos
MessageBox notify: 'Código :', codigo printString,'
Descripción: ', descripcion printString, '
Precio: $', precio printString.!

precio
	^precio!

precio: anObject
	precio := anObject! !
!Flor categoriesFor: #cargaDatos!public! !
!Flor categoriesFor: #codigo!accessing!private! !
!Flor categoriesFor: #codigo:!accessing!private! !
!Flor categoriesFor: #descripcion!accessing!private! !
!Flor categoriesFor: #descripcion:!accessing!private! !
!Flor categoriesFor: #mostrarDatos!public! !
!Flor categoriesFor: #precio!accessing!private! !
!Flor categoriesFor: #precio:!accessing!private! !

Floreria guid: (GUID fromString: '{942003c8-a878-42f0-b437-e76b76ee0474}')!
Floreria comment: ''!
!Floreria categoriesForClass!Kernel-Objects! !
!Floreria methodsFor!

altaCliente
|persona band|
band := true.

[band] whileTrue: [
	persona := Persona new.
	persona cargaDatos.
	personas add: persona.
	band := MessageBox confirm: 'Desea ingrear otro cliente?'.
].

^persona.!

altaFlor
|flor band|
band := true.

[band] whileTrue: [
	flor := Flor new.
	flor cargaDatos.
	flores add: flor.
	band := MessageBox confirm: 'Desea ingrear otra flor?'.
].

^flor.!

altaPedido
|rem des seguir flor item pedido|
seguir := true.
des := self buscarCliente.
(des localidad == 'ROSARIO') ifTrue: [
pedido := Pedido new.] 
ifFalse: [
pedido := FueraRosario new.
].

pedido inicializarRamo.
pedido cargarDatos.
pedido asignarDestinatario: des.

rem := self buscarCliente.
pedido asignarRemitente: rem.

[seguir] whileTrue: [
item := ItemRamo new.
flor := self buscarFlor.
item cargarDatos.
item asignarFlor: flor.
pedido agregarItem: item.


seguir := MessageBox confirm: '¿Desea agregar otra flor?'.].

pedido mostrar.

pedidos add: pedido.

!

buscarCliente
|doc persona|
doc := (Prompter prompt: 'Ingrese el DNI:') asNumber.
persona := personas detect: [:unaPersona | unaPersona dni = doc] ifNone: [nil].
persona isNil ifTrue: [MessageBox notify: 'No se encontró un cliente con ese DNI' ] 
ifFalse: [persona mostrarDatos].
^persona
!

buscarFlor
|cod flor|
cod := (Prompter prompt: 'Ingrese el código de la Flor:') asNumber.
flor := flores detect: [:unaFlor | unaFlor codigo = cod] ifNone: [nil].
flor isNil ifTrue: [MessageBox notify: 'No se encontró una flor con ese código' ] 
ifFalse: [flor mostrarDatos].
^flor!

inicializar
	flores := OrderedCollection new.
	pedidos := OrderedCollection new.
	personas := OrderedCollection new!

menu
|op|
op:=6.
[op=0]whileFalse:[MessageBox notify: 'MENU DE OPCIONES
1-Nuevo Pedido
2-Gestion Cliente
3-Gestion Flores
4-Actualizar Recargo
5-Listado
0- Salir'.
op:= (Prompter prompt: 'Ingrese una opcion del 0 al 5: ') asNumber.
(op=1) ifTrue: [self altaPedido].
(op=2) ifTrue: [self menuCliente].
(op=3) ifTrue: [self menuFlor].
(op=4) ifTrue: [FueraRosario recargo].
(op=5) ifTrue: [self ] ].


!

menuCliente
|op|
op= 3.
[op=0]whileFalse:[MessageBox notify: 'CLIENTES
1-Alta cliente
2-Buscar cliente
0- Salir'.
op:=(Prompter prompt: 'Ingrese una opcion del 0 al 2: ') asNumber.
(op=1) ifTrue: [self altaCliente].
(op=2) ifTrue: [self buscarCliente]. ].
!

menuFlor
|op|
op= 3.
[op=0]whileFalse:[MessageBox notify: 'FLORES
1-Alta flor
2-Buscar flor
0- Salir'.
op:=(Prompter prompt: 'Ingrese una opcion del 0 al 2: ') asNumber.
(op=1) ifTrue: [self altaFlor].
(op=2) ifTrue: [self buscarFlor]. ].! !
!Floreria categoriesFor: #altaCliente!public! !
!Floreria categoriesFor: #altaFlor!public! !
!Floreria categoriesFor: #altaPedido!public! !
!Floreria categoriesFor: #buscarCliente!public! !
!Floreria categoriesFor: #buscarFlor!public! !
!Floreria categoriesFor: #inicializar!public! !
!Floreria categoriesFor: #menu!public! !
!Floreria categoriesFor: #menuCliente!public! !
!Floreria categoriesFor: #menuFlor!public! !

ItemRamo guid: (GUID fromString: '{ac833883-54f9-4cc2-9e14-8a0f41e9a7e6}')!
ItemRamo comment: ''!
!ItemRamo categoriesForClass!Kernel-Objects! !
!ItemRamo methodsFor!

asignarFlor: unaFlor
flor := unaFlor.!

cant
	^cant!

cant: anObject
	cant := anObject!

cargarDatos
cant := (Prompter prompt: 'Ingrese la cantidad: ') asNumber.!

flor
	^flor!

flor: anObject
	flor := anObject! !
!ItemRamo categoriesFor: #asignarFlor:!public! !
!ItemRamo categoriesFor: #cant!accessing!private! !
!ItemRamo categoriesFor: #cant:!accessing!private! !
!ItemRamo categoriesFor: #cargarDatos!public! !
!ItemRamo categoriesFor: #flor!accessing!private! !
!ItemRamo categoriesFor: #flor:!accessing!private! !

Pedido guid: (GUID fromString: '{0e7f9868-036a-4fca-8e8a-9096ff5456a3}')!
Pedido comment: ''!
!Pedido categoriesForClass!Kernel-Objects! !
!Pedido methodsFor!

agregarItem: unItem
ramo add: unItem.!

asignarDestinatario: unaPersona
destinatario := unaPersona.
!

asignarRemitente: unaPersona
remitente := unaPersona.
!

cargarDatos
fecha := Date today.
nroOrden := ProximoCodigo.
Pedido incrementarProximoCodigo.
!

destinatario
	^destinatario!

destinatario: anObject
	destinatario := anObject!

fecha
	^fecha!

fecha: anObject
	fecha := anObject!

inicializarRamo
ramo := OrderedCollection new.!

mostrar
MessageBox notify: ('Pedido cargado - N° orden:', nroOrden printString).

Transcript show: 'Fecha: ', fecha printString; cr;
show: 'Destinatario: ', destinatario nom printString , ', ', destinatario ape printString; cr;
show: 'Remitente: ', remitente nom printString, ', ', remitente ape printString; cr;
show: 'Localidad: ', remitente localidad printString; cr.

ramo do: [:unItem | 
	Transcript show: unItem cant printString; tab;
	show: unItem flor descripcion printString; cr.].!

nroOrden
	^nroOrden!

nroOrden: anObject
	nroOrden := anObject!

ramo
	^ramo!

ramo: anObject
	ramo := anObject!

remitente
	^remitente!

remitente: anObject
	remitente := anObject!

total
|total|
total := 0.! !
!Pedido categoriesFor: #agregarItem:!public! !
!Pedido categoriesFor: #asignarDestinatario:!public! !
!Pedido categoriesFor: #asignarRemitente:!public! !
!Pedido categoriesFor: #cargarDatos!public! !
!Pedido categoriesFor: #destinatario!accessing!private! !
!Pedido categoriesFor: #destinatario:!accessing!private! !
!Pedido categoriesFor: #fecha!accessing!private! !
!Pedido categoriesFor: #fecha:!accessing!private! !
!Pedido categoriesFor: #inicializarRamo!public! !
!Pedido categoriesFor: #mostrar!public! !
!Pedido categoriesFor: #nroOrden!accessing!private! !
!Pedido categoriesFor: #nroOrden:!accessing!private! !
!Pedido categoriesFor: #ramo!accessing!private! !
!Pedido categoriesFor: #ramo:!accessing!private! !
!Pedido categoriesFor: #remitente!accessing!private! !
!Pedido categoriesFor: #remitente:!accessing!private! !
!Pedido categoriesFor: #total!public! !

!Pedido class methodsFor!

incrementarProximoCodigo
ProximoCodigo := ProximoCodigo + 1.!

inicializarCodigo
ProximoCodigo := 1.! !
!Pedido class categoriesFor: #incrementarProximoCodigo!public! !
!Pedido class categoriesFor: #inicializarCodigo!public! !

Persona guid: (GUID fromString: '{db7ab560-bd16-4d5a-9e5e-53e9eb3f286a}')!
Persona comment: ''!
!Persona categoriesForClass!Kernel-Objects! !
!Persona methodsFor!

ape
	^ape!

ape: anObject
	ape := anObject!

cargaDatos
dni:=(Prompter prompt: 'Ingrese numero de documento: ') asNumber.
nom:=(Prompter prompt: 'Ingrese un nombre: ').
ape:=(Prompter prompt: 'Ingrese un apellido: ').
direccion:=(Prompter prompt: 'Ingrese una direccion: ').
localidad:=(Prompter prompt: 'Ingrese una localidad: ') asUppercase.
telefono:=(Prompter prompt: 'Ingrese un telefono: ').!

direccion
	^direccion!

direccion: anObject
	direccion := anObject!

dni
	^dni!

dni: anObject
	dni := anObject!

localidad
	^localidad!

localidad: anObject
	localidad := anObject!

mostrarDatos
MessageBox notify: 'Nombre: ', nom printString,'
Apellido: ', ape printString, '
DNI: ', dni printString, '
Direcci�n: ', direccion printString ,'
Localidad: ', localidad printString,'
Tel�fono: ', telefono printString.!

nom
	^nom!

nom: anObject
	nom := anObject!

telefono
	^telefono!

telefono: anObject
	telefono := anObject! !
!Persona categoriesFor: #ape!accessing!private! !
!Persona categoriesFor: #ape:!accessing!private! !
!Persona categoriesFor: #cargaDatos!public! !
!Persona categoriesFor: #direccion!accessing!private! !
!Persona categoriesFor: #direccion:!accessing!private! !
!Persona categoriesFor: #dni!accessing!private! !
!Persona categoriesFor: #dni:!accessing!private! !
!Persona categoriesFor: #localidad!accessing!private! !
!Persona categoriesFor: #localidad:!accessing!private! !
!Persona categoriesFor: #mostrarDatos!public! !
!Persona categoriesFor: #nom!accessing!private! !
!Persona categoriesFor: #nom:!accessing!private! !
!Persona categoriesFor: #telefono!accessing!private! !
!Persona categoriesFor: #telefono:!accessing!private! !

FueraRosario guid: (GUID fromString: '{7d41c096-24a2-49e7-aa03-2414afccfd08}')!
FueraRosario comment: ''!
!FueraRosario categoriesForClass!Kernel-Objects! !
!FueraRosario methodsFor!

cargarDatos
super cargarDatos.!

total
super total.
total := total + RecargoEnvio.! !
!FueraRosario categoriesFor: #cargarDatos!public! !
!FueraRosario categoriesFor: #total!public! !

!FueraRosario class methodsFor!

costoRecargo
"Método para cambiar el costo de recargo para un pedido fuera de Rosario"

RecargoEnvio := (Prompter prompt: 'Ingrese el nuevo recargo:') asNumber.!

recargo
RecargoEnvio := (Prompter prompt: 'Ingrese el recargo de env�os: ' ) asNumber.! !
!FueraRosario class categoriesFor: #costoRecargo!public! !
!FueraRosario class categoriesFor: #recargo!public! !

"Binary Globals"!

