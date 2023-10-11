import { Component } from '@angular/core';
import { NgxMaskDirective } from "ngx-mask";

@Component({
  selector: 'app-my-employee-form',
  templateUrl: './my-employee-form.component.html',
  styleUrls: ['./my-employee-form.component.css']
})
export class MyEmployeeFormComponent {
  formInputsValidateExtraMessageHidden = {
    employeeEmail: true
  }

  formInputsValidateTextColors = {
    employeeName: "#000",
    employeeEmail: "#000",
    employeeCpf: "#000",
    employeeKnowledge: "#000"
  }

  formInputsValues = {
    employeeName: '',
    employeeEmail: '',
    employeeCpf: '',
    employeePhone: ''
  }

  knowledge = {
    git: false,
    react: false,
    php: false,
    nodejs: false,
    devops: false,
    database: false,
    typescript: false
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
      const knowledgeKeys: string[] = Object.keys(this.knowledge).filter(
        (knowledge: string) => {
          /**
           * o valor "this.knowledge[knowledge]" é referente a algum índice do objeto this.knowledge
           * podendo ser true ou false
           */
          // @ts-ignore
          return this.knowledge[knowledge]
        }
      );

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
      console.log(knowledgeRandomKey)
      this.knowledge[knowledgeRandomKey] = false;
    }
    console.log(knowledgeSelectedQuantity)
  }

  private validEmail(email: string): boolean {
    const EMAIL_REGEX = /[a-zA-Z]*@[a-zA-Z]*\.[a-zA-Z]*/

    return EMAIL_REGEX.test(email)
  }

  private isSomeKnowledgeSelected(): boolean {
    return Object.values(this.knowledge).some(knowledgeValue => knowledgeValue)
  }

  employeeFormSubmitHandler(): void {
    let validationFailed: boolean = false;

    if(this.formInputsValues.employeeName === '') {
      this.formInputsValidateTextColors.employeeName = 'red';
      validationFailed = true
    }

    if(this.formInputsValues.employeeEmail === '') {
      this.formInputsValidateTextColors.employeeEmail = 'red';
      validationFailed = true

    } else if(!this.validEmail(this.formInputsValues.employeeEmail)) {
      this.formInputsValidateExtraMessageHidden.employeeEmail = false
      validationFailed = true
    }

    if(this.formInputsValues.employeeCpf === '') {
      this.formInputsValidateTextColors.employeeCpf = 'red'
      validationFailed = true
    }

    if(!this.isSomeKnowledgeSelected()) {
      this.formInputsValidateTextColors.employeeKnowledge = 'red'
      validationFailed = true
    }

    if(!validationFailed) {
      return
    }
  }
}
