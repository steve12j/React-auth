import { useNavigate } from 'react-router-dom';
import Content from './Content'

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
            <Content
                title={'Unauthorized'}
                description={"You don't have access to this page"}
                buttonText={'Go Back'}
                handleButton={goBack}
            />    
    )
}

export default Unauthorized;