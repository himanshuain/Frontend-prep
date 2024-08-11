import { useEffect, useRef, useState } from "react"


type avatar = {
    id: string,
    avatarImage: string
}

const avatarData: avatar[] = [
    {
        id:"1",
        avatarImage: "A"
    },
    {
        id:"2",
        avatarImage: "B"
    },
    {
        id:"3",
        avatarImage: "C"
    },
    

]

const setAvatarApiCall = (cb: () => void) =>{
setTimeout(cb, 2000);
}


const useClickOutside = (callback: ()=> void) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref?.current && !ref?.current?.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback]);

    return ref;
};


const AvatarPicker = () => {
    const [selectedAvatar, setSelectedAvatar] = useState({
        id: "1",
        avatarImage: "A"
    });

    const [showPopOver, setShowPopOver] = useState<boolean>(false);
    const ref = useClickOutside(() => setShowPopOver(false));
    const handleClick = () => {
        setShowPopOver(!showPopOver);
    }

    return (
      <div className="avatar-picker-container" ref={ref}>
       <Avatar selectedAvatarData={selectedAvatar} active={true} handleClick={handleClick} />
       <AvatarSelector 
       className={showPopOver ? "show" : ""} 
       setSelectedAvatar={setSelectedAvatar} 
       currentAvatar={selectedAvatar} 
       setShowPopOver={setShowPopOver}
       />
      </div>
      
    )
}

const AvatarSelector = ({ className, setSelectedAvatar, currentAvatar, setShowPopOver} : { className: string, setSelectedAvatar: (val : avatar) => void, currentAvatar: avatar, setShowPopOver: (val : boolean) => void }) =>{
    const [newActiveClass, setNewActiveClass] = useState("");
    const [newSelectedAvtar, setNewSelectedAvatar]= useState({});

    const handleSetAvatar= (e) => {
        const selectedId = e?.target?.getAttribute("data-id");
        if(!selectedId || selectedId === currentAvatar.id ) return;
        setNewActiveClass("new-active");
        setNewSelectedAvatar(selectedId);
        setAvatarApiCall(() => {
            setSelectedAvatar(avatarData.find(avatar => avatar?.id === selectedId) as avatar);
            setShowPopOver(false);
            setNewActiveClass("");
        });
    }
    return (
        <>
        <div className={`avatar-selector ${className}`} onClick={handleSetAvatar}>
            {
                avatarData && avatarData.map(avatar =>
                    <Avatar 
                    className={avatar.id === newSelectedAvtar ? newActiveClass : ""} 
                    selectedAvatarData={avatar} 
                    active={avatar.id === currentAvatar.id}
                    />
                    )
            }
        </div>
        </>
       
    )
}


const Avatar = ({className, selectedAvatarData, active, handleClick} : { className?: string, selectedAvatarData: avatar, active: boolean, handleClick?: ()=> void})=>{
    return (
        <button 
        className={`${className} avatar ${active ? "active" : ""}`} 
        key={selectedAvatarData.id} 
        data-id={selectedAvatarData.id}
        onClick={handleClick}
        >
            {selectedAvatarData?.avatarImage}
        </button>
    )
}
export default AvatarPicker;