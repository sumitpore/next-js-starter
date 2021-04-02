import PropTypes from "prop-types";
import React, { PureComponent } from "react";

const propTypes = {
    showModal: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onCloseBtnClick: PropTypes.func.isRequired,
};

class Modal extends PureComponent {
    render() {
        return (
            <>
                {this.props.showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/* content */}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/* header */}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">{this.props.title}</h3>
                                    </div>
                                    {/* body */}
                                    <div className="relative p-6 flex-auto">
                                        <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                            {this.props.description}
                                        </p>
                                    </div>
                                    {/* footer */}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={this.props.onCloseBtnClick}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black" />
                    </>
                ) : null}
            </>
        );
    }
}

Modal.propTypes = propTypes;

export default Modal;
