//variables globales para el juego
var contador_Puntos=0; 
var primer_Toque;
var fin_juego=false;

$(document).ready(function(){
    
	var draw_Cuadros = [1,2,3,4,5,6], iRepeticiones=2;
	
	//evento al hacer clic en los items de la lista
	$('ul li').live('click',function(){
		if(!fin_juego && $(this).css('opacity')!=0){
			var add_Imagen='img/photos/'+$(this).attr('rel')+'.png';
			if(primer_Toque==undefined){
				primer_Toque=$(this);
				primer_Toque.stop(true,true).animate({opacity:.9}).css('background-image','url('+add_Imagen+')');
			}else{
				var segundo_Toque=$(this);
				segundo_Toque.stop(true,true).animate({opacity:.9}).css('background-image','url('+add_Imagen+')');
			
				if(primer_Toque.index() != segundo_Toque.index()){
					//si encuentra pareja
					if(primer_Toque.attr('rel') == segundo_Toque.attr('rel')){
						//aumentamos los puntos en 1
						contador_Puntos++;
						//ocultamos la pareja para que no aparezca mas
						$(primer_Toque).stop(true,true).animate({opacity: 1}).delay(700).animate({opacity: 0});
						$(segundo_Toque).stop(true,true).animate({opacity: 1}).delay(700).animate({opacity: 0});
						
						//finalizamos el juego porque ya encontro todas las parejas
						if(contador_Puntos == $('ul li').length/2) $.termina_Juego();
					}else{
						//si no coinciden los elementos borramos el contenido 
						$(primer_Toque).stop(true,true).animate({opacity: 1},1000,function(){$(this).css('background-image','none');});
						$(segundo_Toque).stop(true,true).animate({opacity: 1},1000,function(){$(this).css('background-image','none');});
					}
				}else{
					//se esta clickeando sobre el mismo elemento, entonces le devolvemos su opacidad original
					$(this).stop(true,true).animate({opacity: 1},1000,function(){$(this).html('&nbsp;');});
				}
				//limpiamos la variable que contiene al primer elemento
				primer_Toque=undefined;
			}
		}else{
			//el juego finalizo o el elemento clickeado ya fue descubierto
		}
	});
		
	//funcion para finalizar el juego
	$.termina_Juego=function(){
		$('#divContenedor ul').html('');
		//finalizar el juego
		fin_juego=true;
		//mostrar el estado final
		$('#divContador').find('p').html('<strong>Puntos obtenidos: </strong>'+contador_Puntos);
		//mostramos la capa inicial
		$('#divInicio').stop(true,true).fadeIn(1500,function(){
			$('ul li').stop(true,true).css('opacity',1).html('photo');
		});
	};
	
	//funcion para iniciar el juego
	$.iniciar_Juego=function(){
		//creamos la cuadricula
		for(var iCont = 0; iCont < iRepeticiones; iCont++){
			//desordenamos el array
			draw_Cuadros = draw_Cuadros.sort(function(){
				return Math.random() - 0.5
			});
			
			//agregamos los items a la lista (inicialmente vacios)
			for(var iCuadros=0;iCuadros<draw_Cuadros.length;iCuadros++){
				$('#divContenedor ul').append('<li rel="'+draw_Cuadros[iCuadros]+'"></li>');
			}
		}
		
		//reseteamos todas las variables globales
        contador_Puntos=0;
        primer_Toque=undefined;
		//ocultamos la capa inicial
		$('#divInicio').stop(true,true).fadeOut(1500,function(){
			fin_juego=false;
		});
	};
	
	//clic en el boton jugar
	$('#btnJugar').on('click',function(){
		//iniciamos el juego
		$.iniciar_Juego();
	});
	
});