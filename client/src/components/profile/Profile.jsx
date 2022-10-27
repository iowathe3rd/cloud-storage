import React from 'react';

const Profile = () => {
    return (
        <div className="p-4 grid grid-cols-2">
            <div>
                <span className="text-xl">Настройки аккаунта</span>
                <div className="flex-col">
                    <div className="indicator w-full max-w-xs">
                        <span className="indicator-item badge badge-error">Опасно!</span>
                        <input type="text" placeholder="Your email address" className="input input-error input-bordered max-w-x w-full s" />
                    </div>
                    <input type="text" placeholder="Как вас зовут?" className="input input-bordered w-full max-w-xs" />
                    <input type="text" placeholder="Псевдоним" className="input input-bordered w-full max-w-xs" />
                    <select className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Who shot first?</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>
                </div>
            </div>
            <div>
                <div className="card max-w-md bg-base-200 shadow-xl">
                    <div className="card-body items-center text-center">
                        <div className="avatar">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src="https://placeimg.com/192/192/people" alt={"avatar"}/>
                            </div>
                        </div>
                        <h2 className="card-title">Beglerov Baurzhan</h2>
                        <p>Вот как выглядит ваша карточка</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;