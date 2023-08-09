import { View, FlatList, ActivityIndicator } from "react-native";
import { styles } from './styles';
import { useGetOrdersQuery } from "../../store/orders/api";
import { OrderItem } from "../../componentes";
import { COLORS } from "../../themes";

const Orders = () => {
    const { data, error, isLoading } = useGetOrdersQuery();
    const renderItem = ({ item }) => <OrderItem {...item} />;
    const KeyExtractor = (item) => item.id.toString();

    if (isLoading)
        return (
            <View style={styles.containerLoader}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={KeyExtractor}
            />
        </View>
    );
};

export default Orders;