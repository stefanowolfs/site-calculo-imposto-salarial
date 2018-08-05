<div class="container-fluid">
    
    <div id="conteudo" class="row justify-content-md-center align-items-start row-eq-height">
        <div class="conteudo-container col py-0 px-0">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <span class="navbar-brand titulo">
                    <i class="fa fa-cogs text-primary"></i>
                    Calculo Salarial
                </span>
            </nav>  
        </div>
    </div>

    <div id="conteudo" class="row justify-content-md-center align-items-start row-eq-height">
        <div class="conteudo-container col py-0">
            <div id="linha-1" class="row justify-content-md-center align-items-start row-eq-height">
                <div id="form-container" class="col py-5 px-3 px-md-4 col-sm-12 col-md-5 col-lg-4 align-self-start">
            <h2>PREENCHA OS DADOS DO FUNCIONÁRIO ABAIXO</h2>
            <hr>

            <form>
                <div class="form-group">
                    <label for="nome">Nome</label>
                    <input 
                    type="text" 
                    class="form-control" 
                    id="nome" 
                    placeholder="ex: Pedro Malazarte" 
                    maxlength="255"
                    >
                    <small id="nome-help" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="cpf">CPF</label>
                    <input 
                    type="text" 
                    class="form-control" 
                    id="cpf" 
                    placeholder="digite apenas números" 
                    maxlength="11"
                    pattern="[0-9]{11}"                    
                    >
                    <small id="cpf-help" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="cpf">RG</label>
                    <input 
                    ype="text" 
                    class="form-control" 
                    id="rg" 
                    placeholder="digite apenas números" 
                    maxlength="10"
                    pattern="[0-9]{10}"
                    >
                    <small id="rg-help" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="cpf">PIS</label>
                    <input 
                    type="text" 
                    class="form-control" 
                    id="pis" 
                    placeholder="digite apenas números" 
                    maxlength="11"
                    pattern="[0-9]{11}"
                    >
                    <small id="pis-help" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                    <label for="cpf">Salário Bruto</label>
                    <input 
                    type="text"
                    class="form-control"
                    id="sal-bruto"
                    data-affixes-stay="true"
                    data-prefix="R$ "
                    data-thousands="."
                    data-decimal=","
                    maxlength="15"
                    placeholder="Ex: 1600,00"
                    pattern="([0-9]{1,5},[0-9]{1,2}$)|([0-9]{1,5})"
                    >
                    
                    <small id="sal-bruto-help" class="form-text text-muted"></small>
                </div>
                <!-- Botão para debugar o campo de calculo -->
                <!-- 
                <button id="btn-teste" type="button" class="btn btn-success btn-block">TESTE</button>
                -->
                <button id="btn-limpa" type="button" class="btn btn-secondary btn-block">RECOMEÇAR</button>
                <button id="btn-calcula" type="button" class="btn btn-success btn-block">CALCULAR</button>
                
            </form>

            </div>

    <div id="resposta-container" class="col col-sm-12 col-md-7 col-lg-8">
            <div class="row justify-content-center">
            <div id="tutorial" class="col col-md-11 py-5 align-self-center">
                <h4 class="cor-enfase pt-5">Preencha os campos do formulário para calcular os descontos de impostos e obter o salário liquido do funcionário</h4>
                <br>
                <hr>
                <br>
                <h4>ENTENDENDO O CALCULO</h4>
                <p>Primeiramente é usado o salário bruto para descobrir a faixa de INSS e calcular o desconto da mesma de acordo com sua aliquota, feito o desconto, utilize o salário (já descontado) descobrir a faixa de IRPF correspondente, com as informações em mãos calcula-se a porcentagem da aliquota e diminui-se o valor na parcela á deduzir, o resultado será então descontado do salário junto com o desconto de INSS para obter-se o salário liquido. </p>
            </div>
            
                <div id="respostas" class="col col-md-11 py-5 d-none">
                    <div class="row">
                        <div class="col">
                            <h1 id="info-nome"></h1>
                            <hr>
                            <div class="row">
                                <div class="col px-5">
                                    <p id="info-cpf"></p>
                                    <p id="info-rg"></p>
                                    <p id="info-pis"></p>
                                    <p id="info-sal-bruto"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="row mx-2 justify-content-around">
                        <div class="sal-descontos col-sm-8 col-md-5 my-3 my-md-2 pt-3">
                                <h5>Descontos</h5>
                                <p id="desconto-inss"></p>
                                <p id="desconto-irpf"></p>
                                
                        </div>
                        <div class="sal-liquido col-sm-8 col-md-5  my-3 my-md-2 pt-3">
                                <h5>Salário Liquido</h5>
                                <h3 id="sal-liquido"></h3>
                        </div>
                    </div>
                    <hr>
                    <div class="testes row">
                        <div class="col">
                            <p id="teste"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>

    <div id="linha-2" class="row justify-content-md-center align-items-center row-eq-height">
        <div class="table-container col px-sm-4 py-4">
            <h3>Após o calculo as faixas utilizadas estarão na cor azul</h3>
            <hr>

            <table class="table table-dark table-striped table-bordered table-sm mb-5">
                 <caption>Tabela de imposto do INSS</caption>
                <thead>
                    <tr>
                        <th scope="col">Faixa</th>
                        <th scope="col">Vlr. Min</th>
                        <th scope="col">Vlr. Max</th>
                        <th scope="col">Alíquota</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="inss-faixa1">
                        <th scope="row">1</th>
                        <td>R$ 0,00</td>
                        <td>R$ 1.693,72</td>
                        <td>8%</td>
                    </tr>
                    <tr id="inss-faixa2">
                        <th scope="row">2</th>
                        <td>R$ 1.693,73</td>
                        <td>R$ 2.822,90</td>
                        <td>9%</td>
                    </tr>
                    <tr id="inss-faixa3">
                        <th scope="row">3</th>
                        <td>R$ 2.822,91</td>
                        <td>R$ 5.645,80</td>
                        <td>11%</td>
                    </tr>
                </tbody>
            </table>



            <table class="table table-dark table-striped table-bordered table-sm my-5">
                 <caption>Tabela de imposto do IRPF</caption>
                <thead>
                    <tr>
                        <th scope="col">Faixa</th>
                        <th scope="col">Vlr. Min</th>
                        <th scope="col">Vlr. Max</th>
                        <th scope="col">Alíquota</th>
                        <th scope="col">Parcela a deduzir</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="irpf-faixa1">
                        <th scope="row">1</th>
                        <td>R$ 0,00</td>
                        <td>R$ 1.903,98</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                    <tr id="irpf-faixa2">
                    <th scope="row">2</th>
                        <td>R$ 1.903,99</td>
                        <td>R$ 2.826,65</td>
                        <td>7,5%</td>
                        <td>R$ 142,80</td>
                    </tr>
                    <tr id="irpf-faixa3">
                        <th scope="row">3</th>
                        <td>R$ 2.826,66</td>
                        <td>R$ 3.751,05</td>
                        <td>15,0%</td>
                        <td>R$ 354,80</td>
                    </tr>
                    <tr id="irpf-faixa4">
                        <th scope="row">4</th>
                        <td>R$ 3.751,06</td>
                        <td>R$ 4.664,68</td>
                        <td>22,5%</td>
                        <td>R$ 636,13</td>
                    </tr>
                    <tr id="irpf-faixa5">
                        <th scope="row">5</th>
                        <td>R$ 4.664,68</td>
                        <td>acima de R$ 4.664,68</td>
                        <td>27,5%</td>
                        <td>R$ 869,36</td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    </div>

    <div class="row justify-content-md-center align-items-start row-eq-height ">
            <div id="footer" class="conteudo-container col py-0 px-0 bg-dark">
                <span class="navbar-brand pl-5 ">
                    <i class="fa fa-code text-warning"></i>
                    <small>made by </small>
                    <strong>Stefano Soro</strong>
                </span>  
            </div>
        </div>
    </div>
    
</div>



