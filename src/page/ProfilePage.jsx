import NavBar from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import showToast from "@/utils/showToast"
import { UserRound, RotateCcw } from "lucide-react"
import LabelAndInput from "@/components/LabelAndInput"
import useForm from "@/hooks/useForm"
import { useNavigate } from "react-router-dom"
import { axiosResetProfile } from "@/services/userService"
import { useState, useRef } from "react"

function ProfilePage () {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const form = useForm(
    { image: "", name: "", username: "" },
    (values) => {
      let textError = {};
      if (!values.name.trim()) textError.name = "Name cannot be empty.";
      if (!values.username.trim()) textError.username = "Username cannot be empty.";
      return textError;
    }
  );

  const navigate = useNavigate();
  const picturrr = "https://placehold.co/100x100?text=Profile"; // default profile

async function changeProfile(e) {
  e.preventDefault();
  if (form.validateForm()) {
    try {
      await axiosResetProfile({
        image: form.values.image,
        name: form.values.name,
        username: form.values.username,
      });

      showToast("bg-[#12B279]", "Saved profile", "Your profile has been successfully updated");
    } catch (e) {
      showToast("bg-[#fb2c36]", "Saved profile error", "Your profile has been error updated");
      if (e.response?.data?.field === "username") {
        form.setErrors((prev) => ({ ...prev, username: "Username already in use" }));
      }
      console.log(e);
    }
  }
}

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    console.log(file)
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);

    form.setValues((prev) => ({
      ...prev,
      image: file,
    }));
  };

  return (
    <>
      <NavBar />
      <section className="flex flex-col justify-center">
        {/* Navigation tabs for small screen */}
        <div className="flex flex-row w-full md:hidden">
          <button className="w-1/4 flex justify-center items-center gap-3 font-medium px-4 py-3 text-[#43403B]">
            <UserRound /> Profile
          </button>
          <button
            onClick={() => navigate("/reset-password")}
            className="w-2/4 flex items-center gap-3 px-6 font-medium text-[#726d64] hover:text-[#43403B]"
          >
            <RotateCcw /> Reset password
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-center md:mt-[120px] sm:mx-4">
          {/* Sidebar menu */}
          <div className="md:flex md:relative">
            <div className="flex items-center py-6 pl-4 gap-3 md:p-0 md:absolute top-[-90px] md:left-0 md:w-[500px]">
              <img className="w-10 h-10 rounded-[99px] md:w-15 md:h-15" src={preview || picturrr} alt="profile" />
              <div className="flex flex-row">
                <h4 className="pr-4 border-r-2 text-xl font-bold text-[#75716B] md:text-24px">Moodeng ja</h4>
                <h4 className="pl-4 text-xl font-medium md:text-24px">Profile</h4>
              </div>
            </div>

            <div className="hidden md:flex flex-col w-auto pr-3 h-auto">
              <button className="flex justify-start items-center gap-3 font-medium px-4 py-3 text-[#43403B]">
                <UserRound /> Profile
              </button>
              <button
                onClick={() => navigate("/reset-password")}
                className="flex justify-start items-center gap-3 font-medium px-4 py-3 text-[#726d64] hover:text-[#43403B]"
              >
                <RotateCcw /> Reset password
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-[#EFEEEB] flex flex-col px-4 pt-4 w-full pb-6 sm:rounded-lg sm:pb-4 md:max-h-[652px] md:max-w-[550px] md:pl-10 md:pt-5">
            <div className="flex flex-col gap-3 justify-between items-center md:flex-row md:justify-normal">
              <img className="w-24 h-24 md:w-30 md:h-30 rounded-[99px]" src={preview || picturrr} alt="profile" />
              <Button
                variant={"whiteButton"}
                className="py-5 px-8 text-sm border-[#75716B] md:ml-7"
                onClick={() => fileInputRef.current.click()}
              >
                Upload profile picture
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <hr className="my-3 border-[#DAD6D1] border-1 w-full" />
            <form onSubmit={changeProfile}>
              <div className="flex flex-col gap-2 pr-6">
                <LabelAndInput
                  label="Name"
                  id="name"
                  type="text"
                  textPlaceholder="Full name"
                  form={form}
                />
                <LabelAndInput
                  label="Username"
                  id="username"
                  type="text"
                  textPlaceholder="Username"
                  form={form}
                />
                <div className="text-[#b1b0ac]">
                  <h4 className="pl-2">Email</h4>
                  <h4 className="pb-3 pt-2 pl-4">moodeng.cute@gmail.com</h4>
                </div>
              </div>
              <Button variant="blackButton" className="w-30 px-10 py-6 mt-2" type="submit">
                Save
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfilePage;
