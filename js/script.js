jQuery(document).ready(function($) {
  $("#sal-bruto").maskMoney();
  // CLICAR NO BOTÃO LIMPA
  $("#btn-limpa").click(function() {
    $("#nome").val("");
    $("#cpf").val("");
    $("#rg").val("");
    $("#pis").val("");
    $("#sal-bruto").val("");
    $("#respostas").addClass("d-none");
    $("#tutorial").removeClass("d-none");
  });
  // CLICAR NO BOTÃO CALCULAR
  $("#btn-calcula").click(function() {
    calcular();
  });

  /*
  // função de teste para debugar o campo de calculo
  $("#btn-teste").click(function() {
    $("#sal-liquido").text(calculaSalario($("#sal-bruto").val()));
    $("#tutorial").addClass("d-none");
    $("#respostas").removeClass("d-none");
  });
  */

  // BLOQUEIA LETRAS EM INPUT
  $("#cpf").keypress(function(evt) {
    if (!(evt.keyCode >= 48 && evt.keyCode <= 57)) {
      evt.preventDefault();
    }
  });
  $("#rg").keypress(function(evt) {
    if (!(evt.keyCode >= 48 && evt.keyCode <= 57)) {
      evt.preventDefault();
    }
  });
  $("#pis").keypress(function(evt) {
    if (!(evt.keyCode >= 48 && evt.keyCode <= 57)) {
      evt.preventDefault();
    }
  });
  /*
  //teste
  $("#sal-bruto").keypress(function(evt) {
    if (evt.keyCode == 13) {
      $("#sal-liquido").text(calculaSalario($("#sal-bruto").val()));
      $("#tutorial").addClass("d-none");
      $("#respostas").removeClass("d-none");
    }
  });
  */
  
});

// MINHAS FUNCTIONS:

// Inicia lógica geral do negócio
function calcular(){
  if (camposValidos()) {
      $("#info-nome").text($("#nome").val());
      $("#info-cpf").text("CPF: " + $("#cpf").val());
      $("#info-rg").text("RG: " + $("#rg").val());
      $("#info-pis").text("PIS: " + $("#pis").val());
      $("#info-sal-bruto").text("Salário Bruto: R$ " + $("#sal-bruto").val());
      $("#sal-liquido").text(calculaSalario($("#sal-bruto").val()));
      if(!($("#tutorial").hasClass("d-none"))){
        $("#tutorial").addClass("d-none");
      }
      if($("#respostas").hasClass("d-none")){
        $("#respostas").removeClass("d-none");
      }
    }
}

// Função que possui tabela com impostos, recebe o salário bruto, calcula descontos e retorna salário liquido 
function calculaSalario(sal) {

  // Tabela INSS com faixas de Salários
  let inss = {
    faixa1: { min: 0, max: 1693.72, aliquota: 8, ativo: false, nome: "inss-faixa1" },
    faixa2: { min: 1693.73, max: 2822.90, aliquota: 9, ativo: false, nome: "inss-faixa2" },
    faixa3: { min: 2822.91, aliquota: 11, ativo: false, nome: "inss-faixa3" }
  };
  
  // Tabela IRPF com faixas de Salários
  let irpf = {
    faixa1: {
      nome: "irpf-faixa1",
      min:0,
      max: 1903.98, 
      aliquota: 0, 
      deduzir: 0,
      ativo: false
    },
    faixa2: {
      nome: "irpf-faixa2",
      min: 1903.99, 
      max: 2826.65,
      aliquota: 7.5,
      deduzir: 142.8,
      ativo: false
    },
    faixa3: {
      nome: "irpf-faixa3",
      min: 2826.66, 
      max: 3751.05,
      aliquota:15,
      deduzir: 354.8,
      ativo: false
    },
    faixa4: {
      nome: "irpf-faixa4",
      min: 3751.06, 
      max: 4664.68,
      aliquota:22.5,
      deduzir: 636.13,
      ativo: false
    },
    faixa5: {
      nome: "irpf-faixa5",
      min: 4664.68,
      aliquota: 27.5,
      deduzir: 869.36,
      ativo: false
    }    
  };

  // Valor dos impostos que serão descontados
  let imposto = {
    descontoInss: 0,
    descontoIrpf: 0
  }
  
  // Remove a mascara de Dinheiro retorna float
  let = valor = dinheiroParaFloat(sal);

  // Calculo de INSS
  if (valor <= inss.faixa1.max) {
    imposto.descontoInss = descontoInss(valor, inss.faixa1.aliquota)
    inss.faixa1.ativo = true;
  }else if(valor >= inss.faixa2.min && valor <= inss.faixa2.max){
    imposto.descontoInss = descontoInss(valor, inss.faixa2.aliquota);
    inss.faixa2.ativo = true;
  }else if(valor >= inss.faixa3.min){
    imposto.descontoInss = descontoInss(valor, inss.faixa3.aliquota);
    inss.faixa3.ativo = true;
  }

  // Salário com desconto INSS
  valor -= imposto.descontoInss;

  //Calculo de IRPF com o valor do salario já descontado do INSS (essa e a forma correta)
  if(valor <= irpf.faixa1.max){
    irpf.faixa1.ativo = true;
  }else if (valor >= irpf.faixa2.min && valor <= irpf.faixa2.max){
    imposto.descontoIrpf = descontoIrpf(valor, irpf.faixa2.aliquota, irpf.faixa2.deduzir);
    irpf.faixa2.ativo = true;
  }else if (valor >= irpf.faixa3.min && valor <= irpf.faixa3.max){
    imposto.descontoIrpf = descontoIrpf(valor, irpf.faixa3.aliquota, irpf.faixa3.deduzir);
    irpf.faixa3.ativo = true;
  }else if(valor >= irpf.faixa4.min && valor <= irpf.faixa4.max) {
    imposto.descontoIrpf = descontoIrpf(valor, irpf.faixa4.aliquota, irpf.faixa4.deduzir);
    irpf.faixa4.ativo = true;
  }else if(valor >= irpf.faixa5.min){
    imposto.descontoIrpf = descontoIrpf(valor,irpf.faixa5.aliquota, irpf.faixa5.deduzir);
    irpf.faixa5.ativo = true;
  }

  // Preenche valores de impostos na view
  $("#desconto-inss").text("INSS: "+floatParaDinheiro(imposto.descontoInss));
  $("#desconto-irpf").text("IRPF: "+floatParaDinheiro(imposto.descontoIrpf));

  // Pinta a linha das faixas que foram utilizadas na cor AZUL
  pintaFaixaDeImposto(inss);
  pintaFaixaDeImposto(irpf);

  // Salário com desconto IRPF
  valor = valor - imposto.descontoIrpf;

  // Retorna resultado com mascara de Dinheiro aplicada
  return floatParaDinheiro(valor);
}

// Função pinta a faixa de imposto ativa
function pintaFaixaDeImposto(obj){
  console.log("pintando faixas");
  
  //iterando sobre propriedades de um objeto
  for (var prop in obj) {
    //se objeto possuir propriedades
    if (obj.hasOwnProperty(prop)) {
        // Debugando no console
        //console.log("Objeto: "+prop);
        //console.log("Nome: "+obj[prop].nome);
        //console.log("Status: "+obj[prop].ativo);

        // instancio um objeto referente ao elemento <tr /> com o nome da faixa ativa
          let tableRow = $("#"+obj[prop].nome);

        // Se faixa de imposto estiver ativo
        if (obj[prop].ativo) {
          
          // se não possuir classe bg-info adiciono
          if(!(tableRow.hasClass("bg-info"))){
            tableRow.addClass("bg-info");
          }
        
          // se faixa estiver inativa
        }else{

          // se possuir classe bg-info removo-a
          if(tableRow.hasClass("bg-info")){
            tableRow.removeClass("bg-info");
          }                  

        }
    }
}
}


// Função que verifica campos do formulário e informa usuario sobre inconsistências
function camposValidos() {
  let erros = 0;
  let nome = $("#nome").val();
  let cpf = $("#cpf").val();
  let rg = $("#rg").val();
  let pis = $("#pis").val();
  let salBruto = $("#sal-bruto").val();

  if (nome.length == 0) {
    $("#nome-help").text("preencha o campo acima");
    erros++;
  } else {
    $("#nome-help").text("");
  }

  if (cpf.length == 0) {
    $("#cpf-help").text("preencha o campo acima");
    erros++;
  } else if (cpf.length < 11) {
    $("#cpf-help").text("o cpf deve conter 11 digitos");
    erros++;
  } else {
    $("#cpf-help").text("");
  }

  if (rg.length == 0) {
    $("#rg-help").text("preencha o campo acima");
    erros++;
  } else if (rg.length < 10) {
    $("#rg-help").text("o cpf deve conter 10 digitos");
    erros++;
  } else {
    $("#rg-help").text("");
  }

  if (pis.length == 0) {
    $("#pis-help").text("preencha o campo acima");
    erros++;
  } else if (pis.length < 11) {
    $("#pis-help").text("o pis deve conter 11 digitos");
    erros++;
  } else {
    $("#pis-help").text("");
  }

  if (salBruto.length == 0) {
    $("#sal-bruto-help").text("preencha o campo acima");
    erros++;
  } else {
    $("#sal-bruto-help").text("");
  }

  if (erros > 0) {
    return false;
  } else {
    return true;
  }
}

// Função que converte valor com mascara de dinheiro em float e o retorna
function dinheiroParaFloat(sal) {
  let valor = parseFloat( sal.replace(".","").replace("R$ ","").replace(",",".") );
  return valor;
}

// Função que adiciona mascara de dinheiro em valor float e o retorna
function floatParaDinheiro(sal) {
  let valor = "R$ " + sal.toFixed(2).replace(".",",");
  return valor;
}

// Função que calcula o desconto de INSS e o retorna
function descontoInss(valor, aliquota) {
  return ((valor /100) * aliquota);
}

// Função que calcula o desconto de IRPF e o retorna
function descontoIrpf(valor, aliquota, deduzir) {
  desconto = (( (valor /100) * aliquota) - deduzir);
  return desconto;
}