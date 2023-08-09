import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native';
import { CategoryItem, Header } from '../../componentes';
import { styles } from './styles'
import useOrientation from '../../hooks/useOrientation';
import {ORIENTATION} from '../../constantes/orientation'
import { useSelector } from 'react-redux';
import { useGetCategoriesQuery } from '../../store/categories/api';
import { COLORS } from '../../themes';
function Categories({ navigation }) {
   // const CATEGORIES=useSelector((state)=>state.categories.data)
   const { data, error, isLoading } = useGetCategoriesQuery();

    const orientation = useOrientation();
    const onSelectCategory=({categoryId,color,name})=>{
        navigation.navigate('Products',{categoryId,color,name});
    };
    if(isLoading) return <ActivityIndicator style={styles.containerLoader} size='large' color={COLORS.primary}/>
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    style={styles.categoryContainer}
                    contentContainerStyle={styles.listCategoryContainer}
                    renderItem={({ item }) => <CategoryItem{...item} onSelectCategory={()=>onSelectCategory({categoryId:item.id,color:item.backgroundColor,name:item.name})} style={
                        orientation === ORIENTATION.LANDSCAPE ? styles.categoryItemLandscape : {}} />}
                    keyExtractor={(item) => item.id}


                />
            </View>
        </View>

    );
}
export default Categories;

