<script setup>
import PageHeader from "/src/components/myTheme/PageHeader.vue";
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
                <img src="/img/login/forgot.jpg"
                     alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body text-black">
                  <form>
                    <h5 class="fw-normal mb-4" style="letter-spacing: 1px;">Restore your account password</h5>

                    <div class="form-outline mb-4">
                      <input type="email" id="form2Example17" class="form-control form-control-lg" />
                      <label class="form-label small" for="form2Example17">Email address</label>
                    </div>

                    <div class="pt-1 mb-2">
                      <button class="btn btn-primary btn-lg btn-block" type="button">Restore</button>
                    </div>
                  </form>
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