import { useEffect, useState } from "react";
import MyContext from "./myContext";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../firebase/FirebaseConfig";

const MyState = (props) => {
    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)"; // Dark background
        } else {
            setMode('light');  
            document.body.style.backgroundColor = "white"; // Light background
        }
    };
            const[loading,setLoading]=useState(false);
                 
            const [products,setProducts]=useState({
             
                title:null,
                price:null,
                imageUrl:null,
                category:null,
                description:null,
                time:Timestamp.now(),
                date:new Date().toLocaleString(
                    "en-US",
                    {
                        month:"short",
                        day:"2-digit",
                        year:"numeric",
                    }
                )

            });


            const addProduct=async()=>{
                if(products.title == null|| products.description == null||products.imageUrl== null || products.price == null|| products.time == null){
                    return toast.error("all fields are required");
                }
                setLoading(true)
                try {
                    const productRef=collection(fireDB,'products');
                    await addDoc(productRef,products)
                    toast.success("Add product succesfully");
                  setTimeout(() => {
                      window.location.href='/dashboard'
                  }, 1000);
                    getProductData();
                    setLoading(false)
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
            }
            ///////////////////////////////////////////////
            const [product,setProduct]=useState([]);
               const getProductData=async ()=>{
                setLoading(true)
                try {

                   const q=query(
                    collection(fireDB,'products'),
                    orderBy('time')
                   ) ;
                   const data =onSnapshot(q,(QuerySnapshot)=>{
                    let productArray=[];
                    QuerySnapshot.forEach((doc)=>{
                        productArray.push({...doc.data() , id:doc.id});
                    });
                    setProduct(productArray)
                    setLoading(false)
                   })
                   return ()=>data;
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
               }     
                useEffect(()=>{
                        getProductData();
                        getUserData();
                },[]);

                //get user data from firebase
                const [user,setUser]=useState([]);

                const getUserData=async ()=>{
                    setLoading(true)
                    try{
                        const result=await getDocs(collection(fireDB,"users"))
                        const usersArray=[];

                        result.forEach((doc)=>{
                                usersArray.push(doc.data());
                                setLoading(false);
                        });

                            setUser(usersArray);
                            console.log(usersArray);
                            setLoading(false);

                    } catch(error){
                        console.log(error);
                        setLoading(false);
                    }
                }

                //update product function
                    const edithandle=(item)=>{

                        setProduct(item)

                    }
                        const updateProduct =async()=>{
                            setLoading(true)
                            try {
                                 console.log('Products before update:', products);
                                if (!products || !products.id) {
                                    console.error("Product ID is missing or products object is undefined.");
                                    setLoading(false);
                                    return;
                                }

                                await setDoc(doc(fireDB,"products",products.id),products);

                                toast.success(" Product Update succesfully");

                                    setTimeout(() => {
                                        window.location.href='/dashboard';
                                    }, 800);
                                getProductData();
                                setLoading(false)
                            } catch (error) {
                                console.error("Error updating product: ", error);
                                setLoading(false)
                            }
                        }

                            //delete product 
                            const deleteProduct=async(item)=>{
                                setLoading(true)
                                        try {
                                            await deleteDoc(doc(fireDB,"products",item.id));
                                            toast.success(" Product delete succesfully");
                                            setLoading(false)
                                        } catch (error) {
                                            console.log(error)
                                            setLoading(false)
                                        }
                            }
                            //filter logic
                            const [searchkey,setSearchkey]=useState('')
                            const [filterType,setFilterType ]=useState('')
                            const [filterprice,setFilterprice]=useState('')

    return (
        <MyContext.Provider value={{ mode, toggleMode,loading,setLoading,product,products,addProduct,setProducts,edithandle,updateProduct,deleteProduct,user,searchkey,setSearchkey,filterType,setFilterType ,filterprice,setFilterprice}}>
            {props.children}
        </MyContext.Provider>
    );
};

export default MyState;
