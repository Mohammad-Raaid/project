import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//my imports

// SVG
import MenuSvg from '../../assets/svg/menu/menu_icon';
import MenuFilledSvg from '../../assets/svg/menu/menu_icon_filled';
import HomeSvg from '../../assets/svg/menu/home_icon';
import HomeFilledSvg from '../../assets/svg/menu/home_icon_filled';
import NotificationsSvg from '../../assets/svg/menu/notification_icon';
import NotificationsFilledSvg from '../../assets/svg/menu/notification_icon_filled';
import ProfileSvg from '../../assets/svg/menu/profile_icon';
import ProfileFilledSvg from '../../assets/svg/menu/profile_icon_filled';

import HomeStack from '../HomeStack/HomeStack';
import BrandStack from '../BrandStack/BrandStack';
import ProfileStack from '../ProfileStack/ProfileStack';
import NotificationStack from '../NotificationStack/NotificationStack';
import { Colors } from '../../global';
import { Platform, View } from 'react-native';

const Tab = createBottomTabNavigator();

function BottomTabs() {
	return (
		<Tab.Navigator
			backBehavior='none'
			tabBarOptions={{
				showLabel: false,
				style: Platform.OS == 'android'
					?
					{ backgroundColor: Colors.WHITE, height: 60, borderTopWidth: 0 }
					:
					{ backgroundColor: Colors.WHITE, }
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeStack}
				options={{
					tabBarIcon: ({ focused }) => (
						focused ?
							< View>
								<HomeFilledSvg />
								<View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 8, borderRadius: 3, backgroundColor: Colors.PRIMARY }} />
							</ View>
							:
							<HomeSvg />
					),

				}}
			/>
			{/* <Tab.Screen name="Brands" component={BrandStack}
				options={{
					tabBarIcon: ({ focused }) => (
						focused ?
							< View>
								<MenuFilledSvg />
								<View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 7, borderRadius: 3, backgroundColor: Colors.PRIMARY }} />
							</View>
							:
							<MenuSvg />
					),
				}}
			/> */}
			<Tab.Screen name="Notifications" component={NotificationStack}
				options={{
					tabBarIcon: ({ focused }) => (
						focused ?
							< View>
								<NotificationsFilledSvg />
								<View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 6, borderRadius: 3, backgroundColor: Colors.PRIMARY }} />
							</View>
							: <NotificationsSvg />
					),
				}}
			/>
			<Tab.Screen name="Profile" component={ProfileStack}
				options={{
					tabBarIcon: ({ focused }) => (
						focused ?
							< View>
								<ProfileFilledSvg />
								<View style={{ height: 5, width: 5, position: "absolute", bottom: -10, right: 8, borderRadius: 3, backgroundColor: Colors.PRIMARY }} />

							</View>
							:
							<ProfileSvg />
					),
				}}
			/>
		</Tab.Navigator>

	);
}
export default BottomTabs;