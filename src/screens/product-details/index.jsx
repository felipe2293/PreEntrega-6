import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart/cart.slice';
import { useGetProductByIdQuery } from '../../store/products/api';
import { COLORS } from '../../themes';

function ProductDetail({ route }) {
    const dispatch = useDispatch();

    const { color, productId } = route.params;
    const { data, error, isLoading } = useGetProductByIdQuery(productId);
    const product = data?.find((product)=>product.id===productId);
    const onAddToCart = () => {
        dispatch(addToCart(product));
    };
    if(isLoading) return <ActivityIndicator style={styles.containerLoader} size='large' color={COLORS.primary}/>
    return (
        <View style={styles.container}>
            <View style={[styles.containerImage, { backgroundColor: color }]}>
                <Image source={{ uri: product.image }} style={styles.image} resizeMode='contain' />
            </View>
            <View style={styles.content}>
                <Text style={styles.textDescription}>{product.resume}</Text>
                <Text style={styles.priceText}>USD {product.price}</Text>
                <Text style={styles.stockText}>Stock: {product.stock}</Text>


                <View style={styles.containerButton}>
                    <TouchableOpacity onPress={onAddToCart} style={styles.addToCartButton}>
                        <Text style={styles.addToCartText}>Agregar al carrito</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    )
}

export default ProductDetail;