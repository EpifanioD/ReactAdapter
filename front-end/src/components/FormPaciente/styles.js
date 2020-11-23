import styled from 'styled-components';
    
export const Container = styled.div`
    margin-left: 20px;
    img {
        position: static;
        margin-left: 20px;
        width: 200px
    }
`;

export const PTable = styled.table`
    width: 900px;
    border-width: 8px;
    border-collapse: collapse;
    
    th {
    padding: 10px;
    background: #bcbcbc;
    text-align: left;
    background-color: #9ACD32;
    }

    tbody {
        width: 100%;

        tr {
            text-align: left;
            border-bottom: 1px solid #bcbcbc;
            
            td {
                padding: 10px;
                text-align: left;
            }

            button {
                border-radius:10px;
                width: 80px;
                margin-top: 5px;
                margin-bottom: 10px;
                background-color: #FFF
            }
           
        }
    }
`;

export const Pagination = styled.div `
    display: flex;
    min-width: 500px;
    justify-content: space-between;
`;

export const PaginationButton = styled.div`
    display: flex;

`;


export const PaginationItem = styled.div`
    margin: 0 10px;
    cursor: pointer;

    ${props => props.isSelect && {
        background: '#6d6d6d',
        padding: '5px',
        borderRadius: '8px',
    }}
`;
