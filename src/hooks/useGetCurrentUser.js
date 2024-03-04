import {} from '@vue/composition-api';
import axios from 'axios';
import URL from '@/views/pages/request/index';
export default async function useGetCurrentUser() {
	try {
		const {data} = await axios.get(URL.CONNECTED_USER)
        console.log(data[0]);
        localStorage.setItem('current_user', JSON.stringify(data[0].user_connecte))
        
	} catch (error) {
		console.log(error);
	}
}
