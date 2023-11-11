import { createSlice } from "@reduxjs/toolkit";

const initChatStatus = {
    isStarted: false,
    isConnected: false,
    isConnecting: false,
}

const initFormChat = {
    fullName: '',
    email: '',
    message: ''
}

const initCustomer = {
    id: null,
    email: '',
    fullName: '',
    avatarUrl: '',
    status: '',
}

const initEmployee = {
    id: null,
    status: '',
}

const initChatState = {
    id: null,
    type: null,
    isShowBox: false,
    chatStatus: { ...initChatStatus },
    customer: { ...initCustomer },
    employee: { ...initEmployee },
    chatList: [],
    chatForm: { ...initFormChat },
}

const chatSlice = createSlice({
    name: 'chat',
    initialState: initChatState,
    reducers: {
        onShowChatBox: (state, action) => {
            state.isShowBox = true;
        },
        onHiddenChatBox: (state, action) => {
            state.isShowBox = false;
        },
        updateChatField: (state, action) => {
            const { key, value } = action.payload;
            if (Object.prototype.hasOwnProperty.call(state, key)) {
                state[key] = value;
            }
        },
        updateChatFields: (state, action) => {
            for (const key in action.payload) {
                if (Object.hasOwnProperty.call(state, key)) {
                    state[key] = action.payload[key]
                }
            }
        },
        updateChatFormField: (state, action) => {
            const { key, value } = action.payload;
            if (Object.prototype.hasOwnProperty.call(state.chatForm, key)) {
                state.chatForm[key] = value;
            }
        },
        updateChatStatusField: (state, action) => {
            const { key, value } = action.payload;
            if (Object.prototype.hasOwnProperty.call(state.chatStatus, key)) {
                state.chatStatus[key] = value;
            }
        },
        updateChatStatusMultipartFields: (state, action) => {
            for (const key in action.payload) {
                if (Object.hasOwnProperty.call(state.chatStatus, key)) {
                    state.chatStatus[key] = action.payload[key]
                }
            }
        },
        onCancelChat: (state, action) => {
            state.id = null;
            state.type = null;
            state.isShowBox = false;
            state.chatList = [];
            state.chatStatus = { ...initChatStatus }
            state.customer = { ...initCustomer }
            state.employee = { ...initEmployee }
            state.chatForm = { ...initFormChat }
        }
    }
})

export const {
    onCancelChat,
    onHiddenChatBox,
    onShowChatBox,
    updateChatField,
    updateChatFields,
    updateChatFormField,
    updateChatStatusField,
    updateChatStatusMultipartFields } = chatSlice.actions;
export default chatSlice.reducer;