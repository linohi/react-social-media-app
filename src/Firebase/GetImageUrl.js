import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const getImageUrl = async (category, imageName) => {
    const storage =  getStorage();
    const storageRef = ref(storage, `images/${category}/${imageName}`)
    return await getDownloadURL(storageRef)
            .then((url) => {
                return url;
            }).catch((err) => {
                return 'Error'
            })
}