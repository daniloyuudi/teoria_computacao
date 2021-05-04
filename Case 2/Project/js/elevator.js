var Elevator = function() {

    var t = this;
    this.$elevator;
    this.movement = false;
    this.row = [];
    this.previousFloor = 0;
    this.intervalFloors = [];
    this.targetFloors = undefined;
    this.direction = 0;
    this.request = [];
    this.statusPanel = false;

    this.openDoors = function(callback, status, statusS, floor) {

        var doors = this.$elevator.find(".door");

        if (doors.hasClass("open") && status) {
            if (t.row.length == 0) { t.direction = 0; }
            t.validateRequest(floor);

            t.targetFloors = undefined;
            t.direction = 0;
            if (t.request.length || t.row.length) { setTimeout(callback, 3000); }
            t.showFloor(floor);

        } else if (status) {

            doors.addClass("open");
            if (t.row.length == 0) { t.direction = 0; }
            t.validateRequest(floor);

            t.targetFloors = undefined;
            t.direction = 0;
            if (t.request.length || t.row.length) { setTimeout(callback, 3000); }
            t.showFloor(floor);

        } else if (doors.hasClass("open") && statusS) {
            t.validateRequest(floor);
            if (t.request.length || t.row.length) { setTimeout(callback, 3000); }

        } else if (statusS) {
            if (t.row.length == 0) { t.direction = 0; }
            doors.addClass("open");
            t.validateRequest(floor);
            if (t.request.length || t.row.length) { setTimeout(callback, 3000); }
        } else {
            if (t.request.length || t.row.length) { setTimeout(callback); }
        }
    };

    this.closeDoors = function(callback) {

        var doors = this.$elevator.find(".door");

        if (doors.hasClass("open")) {

            doors.removeClass("open");
            t.closeAllControlPanel();
            setTimeout(callback, 1000);

        } else {
            t.closeAllControlPanel();
            setTimeout(callback);

        }

    };

    this.showFloor = function(floor) {
        let ds_sign = '';
        let ds_direction = '';
        var directions = t.$elevator.find(".direction");
        var signs = t.$elevator.find(".sign");

        if (t.direction == 0) {
            ds_direction = '◆';
            directions.removeClass('up down');
        } else if (t.direction == 1) {
            ds_direction = '▲';
            directions.removeClass('down');
            directions.addClass('up');
        } else if (t.direction == 2) {
            ds_direction = '▼';
            directions.removeClass('up');
            directions.addClass('down');
        }

        if (floor == 1) { ds_sign = 'T '; } else { ds_sign = floor - 1 + ' ' }


        directions.text(ds_direction);

        signs.text(ds_sign);
        signs.append(directions[0]);
    };

    this.GoFloor = function(number, ob) {
        console.log(t.previousFloor, '<|>', number);
        if (t.previousFloor != number || !t.statusPanel) {

            if (!t.movement) {
                t.previousFloor = number;
                t.movement = true;
                if (!t.statusPanel) {
                    t.closeDoors(function() {
                        t.movement = true;
                        var currentFloor = t.currentFloor();

                        if (t.targetFloors == undefined) {
                            t.targetFloors = ob;
                        }

                        var diferenca = currentFloor - number;
                        if (diferenca < 0) diferenca *= -1;

                        var time = diferenca * 2;
                        var elevator = t.$elevator.find(".elevator");

                        elevator.removeClass("floor1 floor2 floor3 floor4");
                        elevator.addClass("floor" + number);
                        elevator.data("floor", number);
                        elevator.css("-webkit-transition-duration", time + "s");

                        t.intervalMostraAndar = setInterval(function() { t.showFloor(number); }, 1500);

                        setTimeout(function() {

                            clearInterval(t.intervalMostraAndar);
                            t.intervalMostraAndar = undefined;

                            if (t.row.length == 0) { t.direction = 0; }

                            var status = false;

                            t.request.includes(Number(number + '' + t.direction)) ? status = true : status = false;

                            if (t.direction == 0) { status = true; }


                            t.openDoors(function() {

                                if (t.row.length) {
                                    var primeiro = t.row.shift();
                                    t.GoFloor(primeiro);
                                } else if (t.request.length) {
                                    var primary = t.subInt(t.request[0]);
                                    t.intervalFloors = t.getInterval(t.currentFloor(), primary);
                                }
                                t.movement = false;
                            }, number == t.targetFloors, status, number);
                            t.movement = false;
                        }, (time * 1000) + 50);
                    });
                }
            } else {
                t.row.includes(number) ? number = number : t.row.push(number);
            }
        }
    };

    this.subInt = function(value) {
        return Number(String(value).substring(0, 1));
    };

    this.removeFloorQueue = function(floor) {
        t.row.includes(floor) ? t.row.splice(t.row.indexOf(floor), 1) : floor = floor;
    };

    this.removeFloorRequest = function(floor) {
        t.$elevator.find(".BP" + floor).removeClass("button-up-selected");
        t.$elevator.find(".BD" + floor).removeClass("button-down-selected");
        t.request.includes(floor) ? t.request.splice(t.request.indexOf(floor), 1) : floor = floor;
    };

    this.getInterval = function(currentFloor = 0, number = 0) {
        let floors = [];
        var floor = number;
        if (currentFloor < number) {

            for (var x = currentFloor + 1; x <= number; x++) {
                t.direction = 1;
                t.showFloor(t.currentFloor());
                t.GoFloor(x, floor);
                floors.push(x);
            }

        } else {

            for (var x = currentFloor - 1; x >= number; x--) {
                t.direction = 2;
                t.showFloor(t.currentFloor());
                t.GoFloor(x, floor);
                floors.push(x);
            }

        }

        return floors
    }

    this.validateRequest = function(floor) {
        t.openPanel(floor);
        if (t.direction == 1) {
            t.request.includes(Number(floor + '' + 1)) ? t.removeFloorRequest(Number(floor + '' + 1)) : floor = floor;
        } else if (t.direction == 2) {
            t.request.includes(Number(floor + '' + 2)) ? t.removeFloorRequest(Number(floor + '' + 2)) : floor = floor;
        } else if (floor == 1) {
            t.request.includes(11) ? t.removeFloorRequest(11) : floor = floor;
        } else if (floor == 4) {
            t.request.includes(42) ? t.removeFloorRequest(42) : floor = floor;
        } else {
            t.request.includes(Number(floor + '' + 1)) ? t.removeFloorRequest(Number(floor + '' + 1)) : floor = floor;
            t.request.includes(Number(floor + '' + 2)) ? t.removeFloorRequest(Number(floor + '' + 2)) : floor = floor;
        }
    };


    this.currentFloor = function() { return this.$elevator.find(".elevator").data("floor"); };

    this.showInitial = function() {
        var doors = t.$elevator.find(".door");

        if (!doors.hasClass("open")) {
            t.showFloor(1);
            doors.addClass("open");
        }

        t.openPanel(1);
    };

    this.openPanel = function(floor) {
        document.getElementById('EFI' + floor).style.display = 'flex';
    };

    this.closeAllControlPanel = function() {
        var buttonsPanel = t.$elevator.find(".buttons-control-panel");
        for (var floor = 1; floor <= 4; floor++) {
            document.getElementById('EFI' + floor).style.display = 'none';
            buttonsPanel.addClass('close');
            t.statusPanel = false;
        };
    };

    this.functionsPanel = function() {
        var buttonsPanel = t.$elevator.find(".buttons-control-panel");

        document.getElementById('EFI1').addEventListener('click', function() {
            t.closeAllControlPanel();
            t.statusPanel = true;
            buttonsPanel.removeClass('close BCP1 BCP2 BCP3 BCP4');
            buttonsPanel.addClass('BCP1')
        });

        document.getElementById('EFI2').addEventListener('click', function() {
            t.closeAllControlPanel();
            t.statusPanel = true;
            buttonsPanel.removeClass('close BCP1 BCP2 BCP3 BCP4');
            buttonsPanel.addClass('BCP2')
        });


        document.getElementById('EFI3').addEventListener('click', function() {
            t.closeAllControlPanel();
            t.statusPanel = true;
            buttonsPanel.removeClass('close BCP1 BCP2 BCP3 BCP4');
            buttonsPanel.addClass('BCP3')
        });


        document.getElementById('EFI4').addEventListener('click', function() {
            t.closeAllControlPanel();
            t.statusPanel = true;
            buttonsPanel.removeClass('close BCP1 BCP2 BCP3 BCP4');
            buttonsPanel.addClass('BCP4')
        });
    };

    this.startActionsPanel = function() {

        t.functionsPanel();

        t.$elevator.find(".button").on("click", function() {

            var floor = $(this).data("floor");
            if (floor == 10) {
                t.statusPanel = false;
                t.closeAllControlPanel();
                t.openPanel(t.currentFloor());
                if (t.request.length) { t.intervalFloors = t.getInterval(t.currentFloor(), t.subInt(t.request[0])); }
            } else {
                t.statusPanel = false;
                t.intervalFloors = t.getInterval(t.currentFloor(), floor);
            }
        });

        t.$elevator.find(".button-up").on("click", function() {
            var floor = $(this).data("floor");

            t.$elevator.find(".BP" + floor).addClass("button-up-selected");
            t.request.includes(floor) ? t.removeFloorRequest(floor) : t.request.push(floor);

            if (t.currentFloor() == t.subInt(floor) && !t.movement) { setTimeout(t.removeFloorRequest(floor), 2000); }

            if (t.row.length == 0 && t.request.length == 1 && !t.statusPanel) { t.intervalFloors = t.getInterval(t.currentFloor(), t.subInt(floor)); }
        });

        t.$elevator.find(".button-down").on("click", function() {
            var floor = $(this).data("floor");

            t.$elevator.find(".BD" + floor).addClass("button-down-selected");
            t.request.includes(floor) ? t.removeFloorRequest(floor) : t.request.push(floor);

            if (t.currentFloor() == t.subInt(floor) && !t.movement) { setTimeout(t.removeFloorRequest(floor), 2000); }

            if (t.row.length == 0 && t.request.length == 1 && !t.statusPanel) { t.intervalFloors = t.getInterval(t.currentFloor(), t.subInt(floor)); }
        });
    };

    var start = function() {

        var data = {}
        var template = Handlebars.compile($("#view-elevator").html());

        t.$elevator = $(template(data));
        t.showInitial();
        t.startActionsPanel();

        document.getElementById('container-elevator').append(t.$elevator[0]);
    };

    start();
};

$(function() {
    window.e1 = new Elevator();
});