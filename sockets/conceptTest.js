module.exports = function(io){

	var Glove = require('../gloveAPI/glove');
	var glove = new Glove();
	var serialPort = require("serialport");
	//var SerialPort = require("serialport").SerialPort;
	var positivePins = [10,9,6,5,3];
	var negativePins = [15,14,12,8,2];
	var negativeInit = ["LOW","LOW","LOW","LOW","LOW"];

	/*var port = new SerialPort("COM3",{
		baudrate:9600,
		parser: serialPort.parsers.readline('\n')
	});*/

	glove.openPort("COM3",38400);


	glove.on("open",function(){

		console.log("Guante iniciado");
		
		io.sockets.on('connection', function(socket) {

			glove.initializeMotor(positivePins);
			glove.initializeMotor(negativePins);
			glove.activateMotor(negativePins,negativeInit)
			console.log("Socket connected");

			socket.on('activationData', function(data){
				//console.log("activation data " + data);
				var values=[]
				for(i=0;i<data.length -1 ; i++){
					if(data[i]){
						values.push("HIGH");
						//values.push(1);
					}
					else{
						values.push("LOW");
						//alues.push(0);
					}
				}

				glove.activateMotor(positivePins,values);
			});
		});

		glove.on('data',function(data){

			console.log("llegaron datos");
			console.log(data);
		});

	});

	
	
	/*glove.getPortNames(function(portNames){

		console.log(portNames);
	});

	glove.openPort("COM3",9600);

	glove.on('open',function(){

		console.log("puerto abierto");
		glove.initializeMotor([10,9,6,5,3,15,14,12,8,2], function(){

			glove.activateMotor([15,14,12,8,2],["LOW","LOW","LOW","LOW","LOW"]);
		});



		io.sockets.on('connection', function(socket) {

			console.log("Socket connected");
			socket.on('activationData', function(data){
				console.log("activation data " + data);
				var values=[]
				for(i=0;i<data.length -1 ; i++){
					if(data[i]){
						values.push("HIGH");
					}
					else{
						values.push("LOW");
					}
				}

				glove.activateMotor(positivePins,values);
			});
		});


		//glove.activateMotor([12],["LOW"]);
		//glove.activateMotor([10],[255]); 



	});*/
	
	
}