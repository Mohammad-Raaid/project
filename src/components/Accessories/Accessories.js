import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    Image,
    Linking,
} from 'react-native';

//my imports
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native';
import { Colors, Constants, ScreenNames } from '../../global/index';
import EditProfileSvg from '../../assets/svg/menu/EditProfile.svg'
import Back from '../../assets/svg/menu/Back.svg';
import storage from '@react-native-firebase/storage'

const Accessories = ({
    item
}) => {

    const navigation = useNavigation();

    const [accessoriesImage, setAccessoriesImage] = React.useState('')
    const goBack = () => navigation.goBack();
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false
        }).start();
    };
    React.useEffect(() => {
        fadeIn()
        let imageRef = storage().ref('/' + `${item.accessoriesId}.png`);
        imageRef
            .getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                setAccessoriesImage(url);
            })
    }, [])
    return (
        // backgroundColor: true= white ,false=primary 
        <TouchableOpacity
            activeOpacity={1}
            onPress={null}
            style={styles.container}>
            <View style={styles.imageContainer}>
                <Animated.View style={{ ...styles.imageContainer, opacity: fadeAnim }}>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{ uri: accessoriesImage }}
                    />
                </Animated.View>
            </View>

            <View style={styles.firstChildContainer}>

                {/* <Text
                    numberOfLines={1}
                    style={styles.fashionText}>{item.interest && item.interest.interestName && item.interest.interestName}</Text> */}

                <Text
                    numberOfLines={2}
                    style={styles.productText}
                >
                    {item.accessoriesName}
                </Text>

                <Text
                    numberOfLines={1}
                    style={styles.productText}
                >
                    ₹ {item.price}
                </Text>
                <Text
                    onPress={() => Linking.openURL(`tel:${item.mechanicNumber}`)}
                    numberOfLines={2}
                    style={styles.productText}
                >
                    Contact Number: {item.mechanicNumber}
                </Text>

            </View>
        </TouchableOpacity>
    );
}

export default React.memo(Accessories);
