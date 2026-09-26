import { Avatar, Button, Stack, Typography } from "@mui/material"
import { useGetMe } from "../../hooks/useGetMe"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { API_URL } from "../../constants/urls";
import { snackVar } from "../../constants/snack";
const Profile = () => {
    const handleFileUpload = async (event: any) => {
        try {
            const formData = new FormData();
            formData.append('file', event.target.files[0])
            const res = await fetch(`${API_URL}/users/image`, {
                method: "POST",
                body: formData,
                credentials: "include"
            })
            if (!res.ok) {
                throw new Error("Image upload Failed")
            }
            snackVar({ message: "Image Uploaded", type: "success" })
        }
        catch (err) {
            console.log(err)
            snackVar({ message: "Error Uploading File", type: "error" })
        }
    }
    const user = useGetMe()
    return (

        <Stack sx={{
            spacing: 6,
            marginTop: "2.5rem",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Typography variant="h1">{user?.data?.me.username}</Typography>
            <Avatar sx={{ width: 256, height: 256 }}
                src={user.data?.me.imageUrl}
            ></Avatar>
            <Button
                sx={{ marginTop: "2.5rem" }}
                component="label"
                variant="contained"
                size="large"
                startIcon={<UploadFileIcon />}
            >
                Upload Image
                <input type="file" hidden onChange={handleFileUpload}></input>
            </Button>
        </Stack >
    )
}

export default Profile