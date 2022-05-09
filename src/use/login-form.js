import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import { computed, ref, watch } from '@vue/runtime-core'
import { returnStatement } from '@babel/types'
import {useRouter} from 'vue-router'
export function useLoginForm()
{
  const router = useRouter()  
  const {handleSubmit, isSubmitting, submitCount} = useForm()

  const {value:email, errorMessage: eError, handleBlur: eBlur} = useField(
    'email',
    yup
    .string()
    .trim()
    .required("Пожалуйста введите email")
    .email('Необходимо ввести корректный email')
    )

  const MIN_LEHGTH = 6
  const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
    'password',
    yup
    .string()
    .trim()
    .required("Введите пароль")
    .min(6, `Пароль не может быть меньше ${MIN_LEHGTH} символов`)
    )

    const onSubmit = handleSubmit(values =>{
      console.log('form', values)
      router.push('/')
    })

    const isToManyAttempts = computed(() => submitCount.value > 3)
    let timeout = 2000


    watch(isToManyAttempts, () => {
      if(isToManyAttempts) {
        setTimeout(() => {
        submitCount.value = 0
        }, timeout);
        
      }
    })


   return {
     email,
     eError,
     eBlur,
     password,
     pError,
     pBlur,
     onSubmit,
     isSubmitting,
     isToManyAttempts,
     timeout
  }
}