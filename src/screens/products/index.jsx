import { View, TouchableOpacity, Text, FlatList, ImageBackground, ActivityIndicator } from 'react-native';
import { styles } from './styles'
import { Input } from '../../componentes';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../themes';
import { useGetProductsByCategoryQuery } from '../../store/products/api';
function Product({ navigation, route }) {
    const { categoryId, color } = route.params;
    const {data,error,isLoading}=useGetProductsByCategoryQuery(categoryId);
    const [search, setSearch] = useState('');
    const [borderColor, setBorderColor] = useState(COLORS.primary);
    const [filteredProducts, setFilteredPorducts] = useState([]);
    const onHandleBlur = () => { }
    const onhandleChangeText = (text) => {
        setSearch(text);
        filterBySearch(text);
    }
    const onHandleFocus = () => { }

    const filteredProductsByCategory = data?.filter((product) => product.categoryId === categoryId);
    const filterBySearch = (query) => {
        let updateProductList = [...filteredProductsByCategory];
        updateProductList = updateProductList.filter((product) => { return product.description.toLowerCase().indexOf(query.toLowerCase()) !== -1 });
        setFilteredPorducts(updateProductList);
    }
    const clearSearch = () => {
        setSearch('');
        setFilteredPorducts([]);
    };

    const onSelectProduct = ({ productId, name }) => {
        navigation.navigate('ProductDetail', { productId, color, name });
    }

    if(isLoading) return <ActivityIndicator style={styles.containerLoader} size='large' color={COLORS.primary}/>

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Input
                    onHandleBlur={onHandleBlur}
                    onhandleChangeText={onhandleChangeText}
                    onHandleFocus={onHandleFocus}
                    value={search}
                    placeholder="Buscar"
                    borderColor={borderColor}

                />

                {search.length > 0 &&
                    (<Ionicons onPress={clearSearch} name="close-circle" size={30} color={COLORS.black} />)
                }
            </View>

            <FlatList
                style={styles.products}
                data={search.length > 0 ? filteredProducts : filteredProductsByCategory}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onSelectProduct({ productId: item.id, name: item.description })} style={styles.productContainer}>
                        <ImageBackground
                            source={{ uri: item.image }}
                            style={[styles.productImage, { backgroundColor: color }]}
                            resizeMethod="resize"
                            resizeMode="contain"
                        />
                        <View style={styles.productDetail}>
                            <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
                                {item.brand + ' ' + item.description}
                            </Text>
                            <Text style={styles.productPrice}>{`USD ${item.price}`}</Text>
                            <Text style={styles.productPrice}>{`Stock: ${item.stock}`}</Text>

                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
            {filteredProducts.length === 0 && search.length > 0 && (
                <View style={styles.notFound}>
                    <Text style={styles.notFoundText}>No hay productos encontrados </Text>
                </View>
            )}


        </View>
    )
}

export default Product;