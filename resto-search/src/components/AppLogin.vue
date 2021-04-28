<template>
<div>
  <div id="app">
  <v-app id="inspire">
    <v-card width="400px" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1" >SignUp | Login</h1>
    </v-card-title> 
    <v-card-text>
      <v-form>
        <v-text-field 
          label="Email" 
          prepend-icon="mdi-account-circle"
          input name="Email" id="Email" type="text"  placeholder="Email" v-model="userEmail" 
        />
      </v-form>
      <v-form>
        <v-text-field  
        input name="Password" id="Password"  placeholder="Password" v-model="userPassword" 
          type="password"
          label="Password" 
          prepend-icon="mdi-lock"
        />
      </v-form>
    </v-card-text>
     {{ message }} 
      <v-divider></v-divider>
    <v-card-actions>
        <v-btn  elevation= "18" color= "green" :disabled="noInput" @click="createAccount"> SignUp</v-btn>
          <v-spacer></v-spacer>
        <v-btn elevation="18" color ="green" :disabled="noInput" @click="authenticate">LogIn</v-btn>
    </v-card-actions>
    </v-card>
  </v-app>
</div>
</div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";


@Component
export default class AppLogin extends Vue {
 
  readonly $appAuth!: FirebaseAuth;
  readonly $appDB!: FirebaseFirestore;
  private userEmail = "";
  private userPassword = "";
  private message = "";
  $router: any;
  get noInput(): boolean {
    return this.userEmail.length === 0 || this.userPassword.length === 0;
  }
  showMessage(m: string): void {
    this.message = m;
    setTimeout(() => {
      // Auto disappear after 5 seconds
      this.message = "";
    }, 5000);
  }

  
  createAccount(): void {
    this.$appAuth
      .createUserWithEmailAndPassword(this.userEmail, this.userPassword)
      .then((u) => {
        this.showMessage(`User create UID ${u.user?.uid}`);
          this.$appDB
          .collection('users/')
            .add({      
              userID: this.$appAuth.tenantId,
              userEmail: this.userEmail
            });
        this.$router.push({ path: "/group" });
      })
      .catch((err) => {
        this.showMessage(`Unable to create account ${err}`);
      });
  }
  authenticate(): void {
    this.$appAuth
      .signInWithEmailAndPassword(this.userEmail, this.userPassword)
      .then((u) => {
        this.showMessage(`Login successful UID ${u.user?.uid}`);
        this.$router.push({ path: "/group" });
      })
      .catch((err) => {
        this.showMessage(`Unable to login ${err}`);
      });
  }
}
</script>


<style scoped>

</style>
