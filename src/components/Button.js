import styled from 'styled-components';

export const Button = styled.button `
    text-transform: capitalize;
    font-size: 1.4rem;
    background: transparent;
    // won't work without arrow function as it is cathcing the props
    //somehting like that
    border: 0.05rem solid ${ props => props.cart? "var(--mainYellow)"
                                                    :"var(--lightBlue)"};
    color: ${props =>props.cart?"var(--mainYellow)":"var(--lightBlue)"};
    
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    margin: 0.2rem 0.5rem 0.2rem;
    transition: all 0.5s ease-in-out;
    &:hover{
        background: ${ props => props.cart? "var(--mainYellow)":"var(--lightBlue)"};
        color: var(--mainBlue);
    }
    &:focus{
        outline: none;
    }
`;