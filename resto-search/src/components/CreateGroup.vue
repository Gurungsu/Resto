<template>
  <div>
        <section id="input">
        <h1> Enter Group Information </h1>

        <label for="date"> Name: </label>
        <input type="string" v-model="groupName" id="groupName"/>

        <label for="where"> Zip Code: </label>
        <input type="string" v-model="zipCode" id="zipCode"/>

        <label for="category" border-style=solid> Friend: </label>
        <select v-model="friend" id="category">
        <option v-for="(c,pos) in allAccounts" :value="allAccounts[pos]" :key="pos">{{allAccounts[pos]}}</option>
        </select>
        
        <button v-on:click="submitButtonClicked"> Submit </button>
      </section>

      <section >

      <table v-if="groupDataNotEmpty">
        <tbody>
          <tr>
              <td> Name </td> 
              <td> Cuisine </td> 
              <td> Phone </td> 
          </tr>
          <tr v-for="(z,pos) in restaraunts" :key="pos">
              <td>{{z.restaurant_name}}</td>
              <td>{{z.cuisines[0]}}</td>
              <td>{{z.restaurant_phone}}</td>
          </tr>
      </tbody>
    </table>

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
allAccounts : string[] = []; 
restaraunts : Rest[] = [];

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

  submitButtonClicked():void{
    this.requestData(this.restaraunts);
  }

  groupDataNotEmpty():boolean{
    if(this.restaraunts.length > 0){
      return false;
    }
    return true;
  }

  requestData(restaraunts: Rest[]) {
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
      let resto = (response.data.result.data as IDictionary);
      console.log(resto);
      for (let key in resto){
        let value = resto[key];
        restaraunts.push(value as Rest);
      }
      }).catch(function (error) {
        console.error(error);
        });
  }

pushToDB(restList: Rest[]){
  console.log(restList.length);
  for(let i = 0; i < restList.length; i++){
    console.log(restList[i].restaurant_name);
  }
  this.$appDB.collection("/groups").add({
    creatorUser: this.$appAuth.currentUser.email,
    friendUser: this.friend,
    restoList: restList
    });
}
}

</script>
<!---------------------------------------------Script------------------------------------------------------------------>



<style scoped>
input{
  border-style: solid;
  border-color: aqua;
}
</style>