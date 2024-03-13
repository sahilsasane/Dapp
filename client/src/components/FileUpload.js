import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import "./FileUpload.css";
const FileUpload = ({ contract, account, provider }) => {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('Choose File');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `66c61777246b28b006ea`,
                        pinata_secret_api_key: `2db192555128872bc02f45e678d8082eeaa95216eb38675399ef03525f141442`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                contract.add(account, ImgHash);

            }
            catch (e) {
                alert("Unable to upload file.");
            }
        }
        alert("File uploaded successfully.");
        setFilename('Choose File');
        setFile(null);
    };

    const retrieveFile = (e) => {
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        }
        setFilename(e.target.files[0].name);
        e.preventDefault();
    }
    return (
        <div className='top'>
            <form className='form' onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className='choose'>
                    Choose file
                </label>
                <input disabled={!account} type="file" id='file-upload' name='data' onChange={retrieveFile} />
                <span className='textArea'>Image:{filename}</span>
                <button type='submit' className='upload' disabled={!file}>Upload File</button>
            </form>
        </div>
    )
}
export default FileUpload;