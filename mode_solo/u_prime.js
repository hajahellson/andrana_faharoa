var div_point_vert = document.createElement('img');
var div_point_rouge = document.createElement('img');
div_point_vert.src = "../image/point_vert.png";
div_point_rouge.src = "../image/point_rouge.png";

var piece_vert = new Array(
    div_point_vert,
    div_point_vert.cloneNode(true),
    div_point_vert.cloneNode(true)
);
var piece_rouge = new Array(
    div_point_rouge,
    div_point_rouge.cloneNode(true),
    div_point_rouge.cloneNode(true)
);


var trois = 0;
var home = [0, 0, 0];
var guest = [0, 0, 0];
var tab = [0, 0];

var a_deplacer = false;
var verro_home = false;
var num_zone_anc;
var num_piece;

window.onload = function() {

    var zone = new Array(
        document.getElementById('canvas_01'),
        document.getElementById('canvas_02'),
        document.getElementById('canvas_03'),
        document.getElementById('canvas_04'),
        document.getElementById('canvas_05'),
        document.getElementById('canvas_06'),
        document.getElementById('canvas_07'),
        document.getElementById('canvas_08'),
        document.getElementById('canvas_09')
    );

    var button = document.getElementById('myButton');
    var affiche = document.getElementById('affiche');

    button.addEventListener('click', function() {
        trois = 0;

        for (var iter = 0; iter < 3; iter++) {
            piece_vert[iter].parentNode.removeChild(piece_vert[iter]);
            piece_rouge[iter].parentNode.removeChild(piece_rouge[iter]);
        }

        affiche.innerHTML = ' C O M M E N C E R ';

        home = [0, 0, 0];
        guest = [0, 0, 0];
        a_deplacer = false;
        verro_home = false;
    }, false);

    // ************ DEPOSITION DES PIECES *************

    function Point(num) {
        if (!appart_home(num + 1) && !appart_guest(num + 1) && !verro_home) {
            if (!(home[0] + home[1] + (num + 1) == 15)) {
                home[trois] = num + 1;
                zone[num].appendChild(piece_vert[trois]);
                verro_home = true;
                setTimeout(Adve, 2000);
                // Adve() ;
                trois++;
            } else {
                alert("consulte le reglement");
            }
        }

    }

    function appart_home(nb) {
        var answer = false;
        for (var j = 0; j < home.length; j++) {
            if (home[j] == nb) {
                num_piece = j;
                answer = true;
            }
        }

        return answer;
    }

    function appart_guest(nbr) {
        var answers = false;
        for (var k = 0; k < guest.length; k++) {
            if (guest[k] == nbr) {
                answers = true;
            }
        }

        return answers;
    }

    function Adve() {
        var fin = true;
        while (fin == true) {
            var alea = Math.floor(Math.random() * 10);
            while (guest[0] + guest[1] + alea == 15) {
                alea = Math.floor(Math.random() * 10);
            }
            if (!appart_home(alea) && !appart_guest(alea)) {
                guest[trois - 1] = alea;
                zone[alea - 1].appendChild(piece_rouge[trois - 1]);
                verro_home = false;
                fin = false;
            }
        }
    }

    // ************ DEPLACEMENT DES PIECES *************

    function Piece(num) {
        if (appart_home(num + 1) && !verro_home) {
            if (a_deplacer) {
                a_deplacer = false;
                for (var ite = 0; ite < 3; ite++) {
                    piece_vert[ite].style.opacity = 1;
                }
            } else {
                a_deplacer = true;
                num_zone_anc = home[num_piece];
                piece_vert[num_piece].style.opacity = 0.8;
            }
        }

        if (!appart_home(num + 1) && !appart_guest(num + 1) && deplace_valide(num_zone_anc, (num + 1))) {
            if (a_deplacer) {
                affiche.innerHTML = ' E N - C O U R S ';
                zone[num].appendChild(piece_vert[num_piece]);
                home[num_piece] = num + 1;
                verro_home = true;
                for (var iter = 0; iter < 3; iter++) {
                    piece_vert[iter].style.opacity = 1;
                }

                if (!Teste_victoire()) {
                    setTimeout(Adve_deplace, 2000);
                }

                a_deplacer = false;
            }
        }
    }

    function Adve_deplace() {
        var fin_de = true;
        if (Attack()) {
            guest[tab[0]] = tab[1];
            zone[tab[1] - 1].appendChild(piece_rouge[tab[0]]);
            // alert("attack");
            fin_de = false;
        }
        while (fin_de == true) {
            var piece_adve = Math.floor(Math.random() * 3);
            while (piece_adve >= 3) {
                piece_adve = Math.floor(Math.random() * 3);
            }
            var alea_de = Math.floor(Math.random() * 10);
            while (alea_de >= 10 || alea_de == 0) {
                alea_de = Math.floor(Math.random() * 10);
            }
            if (!appart_home(alea_de) && !appart_guest(alea_de) && deplace_valide(guest[piece_adve], alea_de)) {
                guest[piece_adve] = alea_de;
                zone[alea_de - 1].appendChild(piece_rouge[piece_adve]);
                fin_de = false;
            }
        }

        if (Teste_victoire()) {}
        verro_home = false;

    }

    function Teste_victoire() {
        var vic = false;

        var res_home = home[0] + home[1] + home[2];
        var res_guest = guest[0] + guest[1] + guest[2];

        if (res_home == 15) {
            affiche.innerHTML = ' V I C T O I R E ';
            vic = true;
        }

        if (res_guest == 15) {
            affiche.innerHTML = ' D E F A I T E ';
            vic = true;
        }

        return vic;
    }

    function Attack() {
        var tempo = 0;
        var var_a = guest[0];
        var var_b = guest[1];
        var var_c = guest[2];
        for (var iter_a = 0; iter_a < 3; iter_a++) {
            tempo = var_a;
            var_a = var_b;
            var_b = var_c;
            var_c = tempo;
            if ((15 - (var_a + var_b)) > 0 && (15 - (var_a + var_b)) < 10) {
                if (!appart_home((15 - (var_a + var_b))) && !appart_guest((15 - (var_a + var_b))) && deplace_valide(var_c, (15 - (var_a + var_b)))) {
                    tab[0] = iter_a;
                    tab[1] = 15 - (var_a + var_b);

                    return true;
                }
            }
        }

        return false;
    }

    function deplace_valide(par_01, par_02) {
        var retour = false;
        if (par_01 == 5 || par_02 == 5) {
            retour = true;
            return retour;
        }

        switch (par_01) {
            case 1:
                if (par_02 == 6 || par_02 == 8) {
                    retour = true;
                }
                break;

            case 2:
                if (par_02 == 7 || par_02 == 9) {
                    retour = true;
                }
                break;

            case 3:
                if (par_02 == 4 || par_02 == 8) {
                    retour = true;
                }
                break;

            case 4:
                if (par_02 == 3 || par_02 == 9) {
                    retour = true;
                }
                break;

            case 6:
                if (par_02 == 1 || par_02 == 7) {
                    retour = true;
                }
                break;

            case 7:
                if (par_02 == 2 || par_02 == 6) {
                    retour = true;
                }
                break;

            case 8:
                if (par_02 == 1 || par_02 == 3) {
                    retour = true;
                }
                break;

            case 9:
                if (par_02 == 2 || par_02 == 4) {
                    retour = true;
                }
                break;
        }

        return retour;
    }

    // ************ ATTENT D EVENEMENT *************// 

    zone[0].addEventListener('click', function() {
        if (trois < 3) {
            Point(0);
        } else {
            Piece(0);
        }
    }, false);
    zone[1].addEventListener('click', function() {
        if (trois < 3) {
            Point(1);
        } else {
            Piece(1);
        }
    }, false);
    zone[2].addEventListener('click', function() {
        if (trois < 3) {
            Point(2);
        } else {
            Piece(2);
        }
    }, false);
    zone[3].addEventListener('click', function() {
        if (trois < 3) {
            Point(3);
        } else {
            Piece(3);
        }
    }, false);
    zone[4].addEventListener('click', function() {
        if (trois < 3) {
            Point(4);
        } else {
            Piece(4);
        }
    }, false);
    zone[5].addEventListener('click', function() {
        if (trois < 3) {
            Point(5);
        } else {
            Piece(5);
        }
    }, false);
    zone[6].addEventListener('click', function() {
        if (trois < 3) {
            Point(6);
        } else {
            Piece(6);
        }
    }, false);
    zone[7].addEventListener('click', function() {
        if (trois < 3) {
            Point(7);
        } else {
            Piece(7);
        }
    }, false);
    zone[8].addEventListener('click', function() {
        if (trois < 3) {
            Point(8);
        } else {
            Piece(8);
        }
    }, false);

}