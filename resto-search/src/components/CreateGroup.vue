<template>
  <div>
        <section id="input">
        <h1> Enter Group Information </h1>

        <label for="date"> Name: </label>
        <input type="string" v-model="groupName" id="groupName"/>

        <label for="where"> Zip Code: </label>
        <input type="string" v-model="zipCode" id="zipCode"/>

        <label for="category"> Friend: </label>
        <select v-model="friend" id="category">
        <option v-for="(c,pos) in allAccounts" :value="allAccounts[pos]" :key="pos">{{allAccounts[pos]}}</option>
        </select>
        
        <button v-on:click="getData"> Submit </button>
      </section>
    
  </div>
</template>



<!---------------------------------------------Script------------------------------------------------------------------>
<script lang="ts">
import { Component,  Vue} from 'vue-property-decorator';
import { FirebaseFirestore, QueryDocumentSnapshot, QuerySnapshot } from "@firebase/firestore-types"
import { FirebaseAuth } from "@firebase/auth-types";
import axios, {AxiosRequestConfig} from "axios";

  //Interface for JSON response for APOD
interface IDictionary {
    [index:string]: Rest;
}

interface Rest{
  restaurant_name: string,
  restaurant_phone: string,
  cuisines: string[],
}

@Component({
    components: {
        
    }
})

export default class CreateGroup extends Vue {
readonly $appDB!: FirebaseFirestore;
readonly $appAuth!: FirebaseAuth

groupName = "";
zipCode = ""; 
friend = ""; 
currentUserEmail = "";
allAccounts : string[] = []; 

mounted(): void{
  this.$appDB
  .collection('/users')
  .onSnapshot((qs: QuerySnapshot) => {
    this.allAccounts.splice(0);
    qs.forEach((qds: QueryDocumentSnapshot) => {
      if(qds.exists){
        const userData = qds.data();
        if(userData.userEmail != this.$appAuth.currentUser?.email){
          this.allAccounts.push(userData.userEmail)
        }
      }
    })
  });
}

getData(): void{
  this.$appDB.collection("groups/")
              .add({      
              creatorEmail: this.$appAuth.currentUser?.email,
              friendEmail: this.friend,
              zipCode: this.zipCode
              });

  const options : AxiosRequestConfig = {
  method: 'GET',
  url: 'https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/' + this.zipCode,
  params: {page: '1'},
  headers: {
    'x-rapidapi-key': '8737dc0034msh083ba5aeb92208bp1e6704jsna7e669b4d023',
    'x-rapidapi-host': 'us-restaurant-menus.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
  let restaurants = (response.data.result.data as IDictionary);
  console.log(restaurants);

}).catch(function (error) {
	console.error(error);
});
}
}

</script>
<!---------------------------------------------Script------------------------------------------------------------------>



<style scoped>

</style>