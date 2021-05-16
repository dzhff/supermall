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
const Home  =()=>import('../components/Home')
const Bored  =()=>import('../components/Bored')
const Shouye  =()=>import('../components/Shouye')
const Source  =()=>import('../components/Source')
const Show  =()=>import('../components/Show')
const Admin_gong =()=>import('../components/Admin_gong')
const Admin_bored =()=>import('../components/Admin_bored')
const Mixing =()=>import('../components/Mixing')
const Passage_mix =()=>import('../components/Passage_mix')
const Passage_new =()=>import('../components/Passage_new')
const All_user =()=>import('../components/All_user')
const Hout_home =()=>import('../components/Hout_home')




Vue.use(Router)

const routes = [
  {
    path:'',
    redirect:'home'
  },
  {
    path:'/home',
    components:{
      default:Home,
      // scend:Home
    },
    children:[
      {
        path:'',
        redirect:'shouye'
      },
      {
        path:'shouye',
        components:{
          default:Shouye,
          // first:Shouye
        }
      },
      {
        path:'bored',
        components:{
          default:Bored,
          // first:Bored
        },
      },
      {
        path:'source',
        components:{
          default:Source,
          // first:Source
        }
      },
      {
        path:'show',
        components:{
          default:Show,
          // first:Show
        }
      },
    ]
  },
  {
    path:'/admin',
    components:{
      default:Admin,
      // scend:Admin
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
          // scend:User_login
        }
      },
      {
        path:'user_registration',
        components:{
          default:User_registration,
          // scend:User_registration
        }
      },
      {
        path:'admintor',
        components:{
          default:Admintor,
          // scend:Admintor
        }
      }
    ]
  },
  {
    path:'/hout_admin',
    components:{
      default:Hout_admin,
      // scend:Hout_admin
    },
    children:[
      {
        path:'',
        redirect:'hout_home',
      },
      {
        path:'hout_home',
        component:Hout_home
      },
      {
        path:'admin_bored',
        components:{
          default:Admin_bored,
          // third:Admin_bored
        }
      },
      {
        path:'admin_gong',
        components:{
          default:Admin_gong,
          // third:Admin_gong
        }
      },
      // {
        // path:'admin_passage',
        // components:{
          // default:Admin_passage,
          // third:Admin_passage,
        // },
        // children:[
          {
            path:'',
            redirect:'all_user'
          },
          {
            path:'all_user',
            component:All_user,
          },
          {
            path:'passage_mix',
            component:Passage_mix,
          },
          {
            path:'mixing',
            component:Mixing
          },
          {
            path:'passage_new',
            component:Passage_new
          }
        // ]
      // }
    ]
  }
  
]

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

