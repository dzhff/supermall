import Vue from 'vue'
import Router from 'vue-router'

// import Hout_admin from '../components/Hout_admin'
// // 登录注册界面
// // 总
// import Admin from '../components/Admin'
// // 分
// import User_login from '../components/User_login'
// import User_registration from '../components/User_registration'
// import Admintor from '../components/Admintor'

const Hout_admin =()=>import('../components/Hout_admin')
const Admin =()=>import('../components/Admin')
const User_login =()=>import('../components/User_login')
const User_registration =()=>import('../components/User_registration')
const Admintor  =()=>import('../components/Admintor')
// const Home  =()=>import('../components/Home')
const Bored  =()=>import('../components/Bored')
const Shouye  =()=>import('../components/Shouye')
const Source  =()=>import('../components/Source')
const Show  =()=>import('../components/Show')

Vue.use(Router)

const routes = [
  {
    path:'',
    redirect:'shouye'
  },
  {
    path:'/shouye',
    components:{
      default:Shouye,
      first:Shouye
    }
  },
  {
    path:'/bored',
    components:{
      default:Bored,
      first:Bored
    },
  },
  {
    path:'/source',
    components:{
      default:Source,
      first:Source
    }
  },
  {
    path:'/show',
    components:{
      default:Show,
      first:Show
    }
  },
  {
    path:'/admin',
    components:{
      default:Admin,
      scend:Admin
    },
    children:[
      {
        path:'',
        redirect:'user_login'
       // component:Default
      },
      { 
        path:'user_login',
        components:{
          default:User_login,
          scend:User_login
        }
      },
      {
        path:'user_registration',
        components:{
          default:User_registration,
          scend:User_registration
        }
      },
      {
        path:'admintor',
        components:{
          default:Admintor,
          scend:Admintor
        }
      }
    ]
  },
  {
    path:'/hout_admin',
    components:{
      default:Hout_admin,
      scend:Hout_admin
    }
  }
]
//   {
//     path:'/admin',
//     component: Admin,
//     children:[
//       {
//         path:'',
//         redirect:'user_login'
//         // component:Default
//       },
//       { 
//         path:'user_login',
//         component:User_login
//       },
//       {
//         path:'user_registration',
//         component:User_registration
//       },
//       {
//         path:'admintor',
//         component:Admintor
//       }
//     ]
//   },
//   {
//     path:'/hout_admin',
//     component:Hout_admin
//   },
//   {
//     path:'/main',
//     component:Home
//   }
// ]
const router = new Router({
  routes,
})

// router.beforeEach((to,from,next)=>{
//   if(to.path == '/admintor'){
//     next()
//     // console.log(1111)
//   }
//   else{
    // const token = window.localStorage.getItem('admintorToken');
    // if(!token&&to.path!=='/admintor'){
    //   return next('/admintor')
    // }else{
//       next('/admintor')
//     // }
//   }
  
// })

export default router

