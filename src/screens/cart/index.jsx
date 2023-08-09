import { View, FlatList, TouchableOpacity, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles'
import { CartItem } from '../../componentes';
import { clearCart, decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } from '../../store/cart/cart.slice';
import { useCreateOrderMutation } from '../../store/orders/api';

const Cart = ({navigation}) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);
    const total = useSelector((state) => state.cart.total);

    const [createOrder,{data,isError,error,isLoading}]=useCreateOrderMutation();

    const onIncreaseCartItem = (id) => {
        dispatch(increaseItemQuantity({ id }));
    };
    const decreaseCartItem = (id) => {
        dispatch(decreaseItemQuantity({ id }));
    };
    const onremoveCartitem = (id) => {
        dispatch(removeItemFromCart({ id }));
    };
    const onCreateOrder=async ()=>{
        const newOrder={
            id:Math.floor(Math.random()*1000),
            items:cart,
            total,
            user:{
                id:1,
                name:'felipe pepe',
                addres:'123 san juan',
                phone:'2644758594',
                email:'feli22.fp@gmail.com',
            },
            payment:{
                method:'VISA',

            },
            delivery:{
                method:'UPS',
                traclingNumber:Math.floor(Math.random()*1000),
            },
            createAT:Date.now(),
            finishedAt:'',
        };
        try{
            await createOrder(newOrder);
            dispatch(clearCart());
            navigation.navigate('OrdersTab')
        }catch(error){
            console.warn({error})
        }
        
    }
    if (cart.length === 0) {
        return (
            <View style={styles.emptyCartContainer}>
                <Text style={styles.emptyCartText}>El Carrito esta Vacío!</Text>
            </View>
        )

    }
    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                renderItem={({ item }) => <CartItem{...item}
                    onIncreaseCartItem={onIncreaseCartItem}
                    decreaseCartItem={decreaseCartItem}
                    onremoveCartitem={onremoveCartitem} />}
                keyExtractor={(item) => item.id.toString()}
                style={styles.listContainer}
            />
            <View style={styles.footerContainer}>
                <TouchableOpacity onPress={onCreateOrder} style={styles.checkOutButton}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total: </Text>
                        <Text style={styles.totalPrice}>USD {total}</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Cart;