<template>
    <div class="container">
      <div class="card">
        <div class="card-header">Add stutend</div> 
        <img class="card-img-top" src="holder.js/100x180/" alt="">
        <div class="card-body">
            <div class = "input-group">
                <input type="text" v-model="getfName" class="form-control ml-2" placeholder="First Name" />
                <input type="text" v-model="getlName" class="form-control ml-2" placeholder="Last Name" />
                <input type="text" v-model="getUsername" class="form-control ml-2" placeholder="Username" />
                <input type="text" v-model="getEmail" class="form-control ml-2" placeholder="E-mail" />
                <input type="text" v-model="getPassword" class="form-control ml-2" placeholder="Password" />
            </div>
            <button class="btn btn-primary" @click="addStudent">Add</button>
            <div v-if="getResult" class="alert alert-secondary mt-2" role="alert"><p>{{getResult}}</p></div>
        </div>

      </div>
    </div>
  </template>

<script>
    import DS from '../services/DataService'


    export default{

      name: "my-home",
      data(){
        return{ 
          getResult: null,
          getUsername: "",
          getfName: "",
          getlName: "",
          getPassword: "", 
          getEmail: ""
        }
      },
      methods:{
        async addStudent(){
            const data = {
                fname: this.getfName, 
                lname: this.getlName,
                username: this.getUsername,
                email: this.getEmail,
                password: this.getPassword
            }
            console.log(data)
            try {
                await DS.create(data)   
                this.getResult= "Student Added! \n"
            } catch (error) {
                this.getResult = error.getResult
            }


        }
      }

    }
</script>