import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
} from 'react-native';

//my imports
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native';
import { Colors, Constants, ScreenNames } from '../../global/index';
import EditProfileSvg from '../../assets/svg/menu/EditProfile.svg'
import Back from '../../assets/svg/menu/Back.svg';

const Header = ({
	name,
	activateLeftIcon = true,
	activateRightIcon,
	backgroundColor }) => {

	const navigation = useNavigation();

	const goBack = () => navigation.goBack();

	return (
		// backgroundColor: true= white ,false=primary 
		<View style={[styles.container, { backgroundColor: Colors.PRIMARY }]}>
			{/* header left */}
			<View style={styles.headerLeftContainer}>

				{
					activateLeftIcon ?
						<TouchableOpacity
							activeOpacity={Constants.BUTTON_OPACITY}
							onPress={goBack}
							hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
							style={styles.headerLeft}>
							<Back />
						</TouchableOpacity>
						:
						null
				}
				<View style={{ ...styles.headerCenterContainer, marginLeft: activateLeftIcon ? 0 : 20 }}>
					<Text numberOfLines={1} style={{ ...styles.headerText, marginRight: !activateRightIcon ? 30 : 0, }}>
						{name}
					</Text>

				</View>
			</View>

			{/* header center */}

			{/* header right */}
			{
				activateRightIcon
					?
					<View style={styles.headerRightContainer}>

						<TouchableOpacity
							onPress={() => { navigation.navigate(ScreenNames.EDIT_PROFILE, { new: 0 }) }}
							activeOpacity={Constants.BUTTON_OPACITY}
							style={styles.headerRight}>

							<EditProfileSvg />

						</TouchableOpacity>


					</View>
					:
					null
			}


		</View >
	);
}

export default React.memo(Header);
