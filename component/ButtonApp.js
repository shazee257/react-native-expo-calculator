import { Text,TouchableOpacity,View } from 'react-native';
import styleBtn from './styleBtn';

const ButtonApp =(props) => {

    return (
        <TouchableOpacity 
            onPress={props.onPress}
        style={styleBtn.btn}>
            <View style={styleBtn.button}>
                <Text style={styleBtn.Text} >{props.title}</Text>
            </View>
        </TouchableOpacity>  
    )
}
export default ButtonApp;