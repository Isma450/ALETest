<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../../services/auth.service'

const form = reactive({
  username: '',
  password: ''
})

const submissionFeedback = ref('')
const router = useRouter()

const submitForm = async () => {
  const result = await login(form.username, form.password)
  if (result) {
    submissionFeedback.value = 'Success! Redirecting...'
    // Perform redirection or state update here
    router.push('/catalog')
  } else {
    submissionFeedback.value = 'Failed to login. Please check your credentials.'
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Connexion</div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="username" class="form-label">Nom d'utilisateur</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="form.username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="form.password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary" :disabled="isLoading">
                Se connecter
              </button>
              <div v-if="submissionFeedback" class="mt-3">
                {{ submissionFeedback }}
              </div>
              <div v-if="error" class="mt-3 text-danger">
                {{ error }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
