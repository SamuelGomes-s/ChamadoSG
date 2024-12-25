import {
    useRef,
    useState
} from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import {
    Container,
    Content,
    ContentForm,
    CustomerForm,
    Input,
    LabelName,
    SubbmitBTN
} from "./styles";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import {
    addDoc,
    collection
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

function Customers() {

    const nameRef = useRef(null)
    const cnpjRef = useRef(null)
    const addressRef = useRef(null)
    const [loading, setLoading] = useState(false)

    async function handleCreateCostumers(event) {
        event.preventDefault()
        let name = nameRef.current?.value || ''
        let cnpj = cnpjRef.current?.value || ''
        let address = addressRef.current?.value || ''
        if (!name && !cnpj && !address) {
            nameRef.current.focus()
            toast.warning('Preencha os campos ')
            return
        }
        if (!name) {
            nameRef.current.focus()
            toast.warning('Preencha o campo nome do cliente ')
            return
        }
        if (!cnpj) {
            cnpjRef.current.focus()
            toast.warning('Preencha o campo cnpj do cliente ')
            return
        }
        if (!address) {
            addressRef.current.focus()
            toast.warning('Preencha o campo endereço do cliente ')
            return
        }
        await createCostumers(name, cnpj, address)
    }

    async function createCostumers(name, cnpj, address) {
        setLoading(true)
        try {
            await addDoc(collection(db, 'customersCollection'), {
                name: name,
                cnpj: cnpj,
                address: address,
                createdAt: new Date()
            })
            toast.success('Cliente cadastrado')
            nameRef.current.value = null;
            cnpjRef.current.value = null;
            addressRef.current.value = null;
        } catch (error) {
            toast.error(`Erro ao cadastrar ${error.message}`)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Container>
            <Header />
            <Content>
                <Title text={'Clientes'}>
                    <FaPersonCirclePlus />
                </Title>
                <ContentForm>
                    <CustomerForm
                        onSubmit={handleCreateCostumers}
                    >
                        <LabelName>Nome do cliente:</LabelName>
                        <Input
                            ref={nameRef}
                            type="text"
                            placeholder="Digite o nome do cliente"
                        />
                        <LabelName>Cnpj do cliente:</LabelName>
                        <Input
                            ref={cnpjRef}
                            type="text"
                            placeholder="Digite o cnpj do cliente"
                        />
                        <LabelName>Endereço do cliente:</LabelName>
                        <Input
                            ref={addressRef}
                            type="text"
                            placeholder="Digite o endereço do cliente"
                        />
                        <SubbmitBTN disabled={loading}>Cadastrar</SubbmitBTN>
                    </CustomerForm>
                </ContentForm>
            </Content>
        </Container>
    );
}

export default Customers;