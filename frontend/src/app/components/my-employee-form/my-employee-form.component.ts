import { Component } from '@angular/core';
import { MyEmployeeService } from "../../services/my-employee.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-my-employee-form',
  templateUrl: './my-employee-form.component.html',
  styleUrls: ['./my-employee-form.component.css']
})
export class MyEmployeeFormComponent {
  /**
   * O objeto abaixo é responsável por manter o estado da diretiva hidden para os campos
   * que necessitam de mensagens extras além de "Este campo é obrigatório"
   */
  formInputsValidateExtraMessageHidden = {
    employeeEmail: true,
    employeeCpf: true,
    employeePhone: true
  }

  /**
   * O objeto abaixo guarda o estado da cor do texto de mensagem para a validação
   * do formulário. Em caso de erro, os valores das cores abaixo serão alterados
   * para "red"
   */
  formInputsValidateTextColors = {
    employeeName: "#000",
    employeeEmail: "#000",
    employeeCpf: "#000",
    employeeKnowledge: "#000"
  }

  /**
   * O objeto abaixo armazena os valores dos inputs digitados pelo o usuário
   */
  formInputsValues = {
    employeeName: '',
    employeeEmail: '',
    employeeCpf: '',
    employeePhone: ''
  }

  /**
   * O objeto abaixo armazena o estado dos valores da checkbox de conhecimentos
   */
  knowledge = {
    git: false,
    react: false,
    php: false,
    nodejs: false,
    devops: false,
    database: false,
    typescript: false
  }

  constructor(
    private myEmployeeService: MyEmployeeService,
    private toastr: ToastrService
  ) {}

  private validEmail(email: string): boolean {
    /**
     * O código abaixo aplica uma expressão regular para verificar o formato
     * de um email e determinar se é um formato válido ou não.
     * [a-zA-Z]*@ - procura por quaisquer caracteres de "a" a "z" e "A" a "Z" da tabela ASCII até encontrar o "@"
     * [a-zA-Z]*\. - procura por quaisquer caracteres de "a" a "z" e "A" a "Z" da tabela ASCII até encontrar o "."
     * [a-zA-Z] - procura por quaisquer caracteres de "a" a "z" e "A" a "Z" após o "."
     */
    const EMAIL_REGEX = /[a-zA-Z]*@[a-zA-Z]*\.[a-zA-Z]*/

    return EMAIL_REGEX.test(email)
  }

  /**
   * A função abaixo verifica se há alguma propriedade
   * do objeto this.knowledge com o valor true
   *
   */
  private isSomeKnowledgeSelected(): boolean {
    /**
     * O código abaixo percorre os valores do objeto this.knowledge e retorna
     * o próprio valor da propriedade. Se o valor for false, é ignorado,
     * se for true então há alguma propriedade selecionada.
     */
    return Object.values(this.knowledge).some(knowledgeValue => knowledgeValue)
  }

  private formatCpf(cpf: string): string {
    /**
     * O seguinte código aplica uma formatação em um cpf com uma regex
     * A regex: (\d{3}), seleciona três dígitos e os define em um grupo,
     * isso é feito 3 vezes: (\d{3})(\d{3})(\d{3}). E em seguida:
     * (\d{2}) seleciona 2 dígitos e os define em grupo. Por exemplo
     * a string 12345678909 é separada dessa forma: (123)(456)(789)(09)
     * e o método replace aplica a formatação: 123.456.789-09
     */
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  }

  private formatPhone(phone: string): string {
    /**
     * O seguinte código aplica uma formatação em um número de telefone com uma regex
     * A regex: (\d{2}) selecione dois digitos e o define em um grupo,
     * (\d{5}) seleciona 5 dígitos e os define em um grupo,
     * (\d{4}) seleciona 4 dígitos e os define me um grupo. Por exemplo
     * a string 82981852058 é separada dessa forma (82)(98185)(2058) e o método replace
     * aplica a formatação: (82) 98185-2058
     */
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  }

  /**
   * A função abaixo monta o objeto FormData e formata os campos cpf e phone
   * para serem enviados ao backend
   *
   */
  private getFormData(): FormData {
    const formData = new FormData()

    formData.append('name', this.formInputsValues.employeeName)
    formData.append('email', this.formInputsValues.employeeEmail)
    formData.append('cpf', this.formatCpf(this.formInputsValues.employeeCpf))

    if(this.formInputsValues.employeePhone !== '') {
      formData.append('phone', this.formatPhone(this.formInputsValues.employeePhone))
    }

    /**
     * Os campos selecionados na checkbox knowledge serão agrupados.
     * O método getKnowledgeKeysSelected retornará as chaves do objeto this.knowledge
     * e em seguida será iterado e os valores serão passados para o objeto formData
     */
    this.getKnowledgeKeysSelected().forEach(knowLedgeKeySelected => {
      formData.append('knowledge[]', knowLedgeKeySelected)
    })


    return formData
  }

  /**
   * O método apenas define uma string vazia para os inputs
   */
  private clearForm() {
    Object.keys(this.formInputsValues).forEach((inputKey: string) => {
      // @ts-ignore
      this.formInputsValues[inputKey] = ''
    })
  }

  private sendFormData() {
    const formData = this.getFormData()

    this.myEmployeeService.create(formData).subscribe(response => {
      if(response.status) {
        this.toastr.success("Sucesso", "Registrado com sucesso!")

        this.clearForm()
        return
      }

      Object.keys(response).forEach(field => {
        this.toastr.error(field, response[field])
      })
    })
  }

  private validateForm(): boolean {
    const MIN_CPF_LENGTH = 11
    const MIN_PHONE_LENGTH = 11

    const {
      employeeName: name,
      employeeEmail: email,
      employeeCpf: cpf,
      employeePhone: phone
    } = this.formInputsValues

    let validationFailed = true

    /**
     * O código abaixo apenas verifica se o campo name está vazio
     */
    if(name === '') {
      this.formInputsValidateTextColors.employeeName = 'red';
      validationFailed = false
    } else {
      this.formInputsValidateTextColors.employeeName = '#000'
    }

    /**
     * O código verifica se o campo email está vazio e se é um valor válido
     */
    if(email === '') {
      this.formInputsValidateTextColors.employeeEmail = 'red';
      validationFailed = false

    } else if(!this.validEmail(email)) {
      this.formInputsValidateTextColors.employeeEmail = '#000';
      this.formInputsValidateExtraMessageHidden.employeeEmail = false
      validationFailed = false

    } else {
      this.formInputsValidateTextColors.employeeEmail = '#000';
      this.formInputsValidateExtraMessageHidden.employeeEmail = true
    }

    if(cpf === '') {
      this.formInputsValidateTextColors.employeeCpf = 'red'
      validationFailed = false

    } else if(cpf.length < MIN_CPF_LENGTH) {
      this.formInputsValidateTextColors.employeeCpf = '#000';
      this.formInputsValidateExtraMessageHidden.employeeCpf = false

    } else {
      this.formInputsValidateTextColors.employeeCpf = '#000';
      this.formInputsValidateExtraMessageHidden.employeeCpf = true
    }

    if(phone !== '') {
      if(phone.length < MIN_PHONE_LENGTH){
        validationFailed = false
        this.formInputsValidateExtraMessageHidden.employeePhone = false;
      } else {
        this.formInputsValidateExtraMessageHidden.employeePhone = true;
      }
    }

    if(!this.isSomeKnowledgeSelected()) {
      this.formInputsValidateTextColors.employeeKnowledge = 'red'
      validationFailed = false
    } else {
      this.formInputsValidateTextColors.employeeKnowledge = '#000'
    }

    return validationFailed
  }

  private getKnowledgeKeysSelected(): string[] {
    return Object.keys(this.knowledge).filter(
      (knowledge: string) => {
        /**
         * o valor "this.knowledge[knowledge]" é referente a algum índice do objeto this.knowledge
         * podendo ser true ou false
         */
        // @ts-ignore
        return this.knowledge[knowledge]
      }
    )
  }

  getEmployeesEntries(): void {
    // this.myEmployeeService.getAll().subscribe((employeesEntries) => this.myEmployeesEntries = employeesEntries)
  }

  knowledgeHandler(knowledge: keyof typeof this.knowledge): void {
    /**
     * O código abaixo apenas irá inverter o valor de this.knowledge[knowledge]
     * Se o usuário clica na caixa o valor será true
     * Se o usuário desmarca a caixa, o valor será false
     */
    this.knowledge[knowledge] = !this.knowledge[knowledge]

    /**
     * As constantes abaixo definem o valor inicial para o método reduce, KNOWLEDGE_ACTIVE_COUNTER_INIT_VALUE
     * e a quantidade máxima de caixas permitidas para marcar: MAX_KNOWLEDGE_BOXES_CHECKED
     */
    const KNOWLEDGE_ACTIVE_COUNTER_INIT_VALUE: number = 0
    const MAX_KNOWLEDGE_BOXES_CHECKED = 3

    /**
     * Com o método reduce, o código abaixo incrementa a variável knowledgeActiveCounter
     * se o valor knowledge for true e retorna o valor incrementado à variável knowledgeSelectedQuantity
     */
    const knowledgeSelectedQuantity: number = Object.values(this.knowledge).reduce(
      (knowledgeActiveCounter: number, knowledge: boolean): number =>
        knowledge ? ++knowledgeActiveCounter : knowledgeActiveCounter,
      KNOWLEDGE_ACTIVE_COUNTER_INIT_VALUE
    )

    /**
     * Caso haja mais de 3 caixas selecionadas, o bloco if abaixo
     * se encarregará de desmarcar alguma caixa selecionada anteriormente
     */
    if(knowledgeSelectedQuantity > MAX_KNOWLEDGE_BOXES_CHECKED) {
      /**
       * O array de strings abaixo contém todos os checkboxes marcados
       */
      const knowledgeKeys: string[] = this.getKnowledgeKeysSelected()

      // declaração da variável knowledgeRandomKey em um escopo superior
      let knowledgeRandomKey: keyof typeof this.knowledge

      /**
       * Looping para gerar um índice do objeto "this.knowledge" aleatório
       * diferente do que o usuário clicou
       */
      do {
        // A linha abaixo gera um número aleatório entre 0 o tamanho do array knowledgeKeys
        const randomKnowledgeKeyIndex: number = Math.floor(Math.random() * knowledgeKeys.length)

        /**
         * A linha abaixo pega o nome de alguma chave do objeto this.knowledge
         * através do array knowledgeKeys por um índice gerado aleatoriamente
         */
        knowledgeRandomKey = knowledgeKeys[randomKnowledgeKeyIndex] as keyof typeof this.knowledge
      } while(knowledgeRandomKey === knowledge)

      // desmarca alguma caixa selecionada anteriormente
      this.knowledge[knowledgeRandomKey] = false;
    }
  }

  employeeFormSubmitHandler(): void {
    // se a validação falhar, a função ira retornar nada para encerrar a execução
    if(!this.validateForm()) return

    // se a validação não falhar, os dados do formulário serão enviados ao backend
    this.sendFormData()
  }
}
