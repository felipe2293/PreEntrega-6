import { TouchableOpacity, Text, View } from "react-native";

import { styles } from './styles';

const formatDate = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString();
};

const OrderItem = ({id, total, createAT,items}) => {
    return (

        <TouchableOpacity onPress={() => { }} style={styles.orderItemContainer}>
            <View style={styles.orderHeaderContainer}>
                <Text style={styles.orderItemText}>Fecha: {formatDate(createAT)}</Text>
            </View>
            <View style={styles.orderBody}>
                <Text style={styles.orderItemId}>Id: {id}</Text>
                <Text style={styles.orderItemText}>Total: USD {total}</Text>
                <Text style={styles.orderItemId}>Total items: {items.length}</Text>



            </View>


        </TouchableOpacity>

    )
}

export default OrderItem;