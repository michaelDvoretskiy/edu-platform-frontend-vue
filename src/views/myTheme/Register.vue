<script setup>
import PageHeader from "/src/components/myTheme/PageHeader.vue";

function authenticate() {
  console.log("123");
}
</script>
<template>
  <PageHeader/>
  <div class="container-xxl py-4 pt-1">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0 border-bottom">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img src="/img/login/login2.jpg"
                     alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body text-black pt-0 pb-0">
                  <form>
                    <h5 class="fw-normal mb-2" style="letter-spacing: 1px;">Register your account</h5>

                    <div class="form-outline mb-2">
                      <input type="email" id="email" class="form-control form-control-lg" />
                      <label class="form-label small" for="email">Email address</label>
                    </div>

                    <div class="form-outline mb-2">
                      <input type="password" id="passwd" class="form-control form-control-lg" />
                      <label class="form-label" for="passwd">Password</label>
                    </div>

                    <div class="form-outline mb-2">
                      <input type="password" id="passwd2" class="form-control form-control-lg" />
                      <label class="form-label" for="passwd2">Confirm password</label>
                    </div>

                    <div class="pt-1 mb-2">
                      <button class="btn btn-primary btn-lg btn-block" type="button" @click="authenticate()">
                        Register
                      </button>
                    </div>
                  </form>
                  <div class="text-end">
                    <p style="color: #393f81;" class="mb-0">
                      Allready have an account?
                      <RouterLink class="small text-muted" :to="{ name: 'Login'}">
                        Login here
                      </RouterLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  a:hover {
    color: var(--primary) !important;
  }
</style>