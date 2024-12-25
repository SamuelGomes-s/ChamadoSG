import {
    useEffect,
    useRef,
    useState
} from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import {
    Container,
    ContainerForm,
    Content,
    Label,
    TextArea,
    FormTickets,
    ContentForm,
    ContentStatus,
    Option,
    Select,
    Span,
    Radio,
    SubbmitBTN,
    Loading
} from "./styles";
import { BsPlusCircleDotted } from "react-icons/bs";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

export default function NewTickets() {
    const [customers, setCustomers] = useState([])
    const [status, setStatus] = useState('Aberto')
    const [topic, setTopic] = useState('Informatica')
    const [customerSelected, setCustomerSelected] = useState('')
    const [loading, setLoading] = useState(true)
    const [loadingRegister, setLoadingRegister] = useState(false)
    const [title, setTitle] = useState("Abertura de chamado")
    const [update, setUpdate] = useState(false)
    const textAreaRef = useRef(null)
    const customerRef = useRef(null)
    const topicRef = useRef(null)
    const { id } = useParams()
    const docRefCustomerCollection = collection(db, 'customersCollection')
    useEffect(() => {
        async function loadCostumers() {
            try {
                const params = query(docRefCustomerCollection, orderBy('name', 'asc'))
                const customersSnap = await getDocs(params)
                let data = []
                customersSnap.forEach((doc) => {
                    data.push({
                        name: doc.data().name,
                        cnpj: doc.data().cnpj,
                        address: doc.data().address,
                        createdAt: doc.data().createdAt,
                        id: doc.id,
                    })
                })
                if (id) {
                    loadId(data)
                } else {
                    setCustomerSelected(data[0])
                }
                setCustomers(data)
            } catch (error) {
                console.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        loadCostumers()
        return () => { }
    }, [id])

    async function loadId(list) {
        try {
            setLoading(true)
            const docRefTicket = doc(db, 'ticketsCollection', id)
            const data = await getDoc(docRefTicket)
            if (data.exists()) {
                let index = list.findIndex(item => item.id === data.data().customerId)
                setCustomerSelected(list[index])
                setTitle(`Editando o chamado de id:${id}`)
                setStatus(data.data().status)
                setTopic(data.data().topic)
                setUpdate(true)
                textAreaRef.current.value = data.data().complement
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    function addTickets(event) {
        event.preventDefault()
        if (update) {
            updateTickets()
            return
        }
        if (!customerSelected) {
            toast.warning('Verifique o campo cliente.')
            customerRef.current.focus()
            return
        }
        if (!topic) {
            toast.warning('Verifique o campo de assunto.')
            topicRef.current.focus()
            return
        }
        handleregistercalls()
    }

    function addStatus(event) {
        setStatus(event.target.value)
    }

    function handleSelectCustomer(event) {
        let index = customers.findIndex(item => item.id === event.target.value)
        setCustomerSelected(customers[index])
    }

    function handleSelectTopic(event) {
        setTopic(event.target.value)
    }

    async function handleregistercalls() {
        setUpdate(false)
        setLoadingRegister(true)
        try {
            const dateFormated = format(new Date(), 'dd/MM/yyyy')
            const response = await addDoc(collection(db, 'ticketsCollection'), {
                customerId: customerSelected.id,
                customer: customerSelected.name,
                topic: topic,
                status: status,
                createdAt: new Date(),
                createdAtFormated: dateFormated,
                complement: textAreaRef.current.value || null
            })
            setStatus('Aberto')
            setTopic('default')
            setCustomerSelected('default')
            textAreaRef.current.value = null
            toast.success('Chamado criado com sucesso.')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoadingRegister(false)
        }
    }

    async function updateTickets() {
        try {
            setLoadingRegister(true)
            const docRefUpdt = doc(db, 'ticketsCollection', id)
            await updateDoc(docRefUpdt, {
                customer: customerSelected.name,
                topic: topic,
                status: status,
                complement: textAreaRef.current.value || ''
            })
            toast.success(`Chamado ${id} atualizado com sucesso.`)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoadingRegister(false)
        }
    }

    return (
        <Container>
            <Header />
            <Content>
                <Title text={title}>
                    <BsPlusCircleDotted />
                </Title>
                <ContainerForm>
                    <ContentForm>
                        {loading ? <Loading > carregando ...... </Loading > : (<FormTickets onSubmit={addTickets}>
                            <Label>
                                Cliente
                            </Label>
                            <Select
                                disabled={loadingRegister}
                                ref={customerRef}
                                value={customerSelected?.id || customers[0].id}
                                onChange={handleSelectCustomer}
                            >
                                {
                                    customers.length !== 0 && customers.map((doc) => <Option
                                        key={`${doc.id}`}
                                        value={`${doc.id}`}
                                    >
                                        {doc.name}
                                    </Option>)
                                }
                            </Select>
                            <Label>
                                Assunto
                            </Label>
                            <Select
                                value={topic}
                                ref={topicRef}
                                onChange={handleSelectTopic}
                            >
                                <Option
                                    value={'Informatica'}
                                >
                                    Informatica
                                </Option>
                                <Option
                                    value={'Recursos Humanos'}
                                >
                                    Recursos Humanos
                                </Option>
                                <Option
                                    value={'Compras'}
                                >
                                    Compras
                                </Option>
                            </Select>
                            <ContentStatus
                            >
                                <Radio
                                    type="radio"
                                    name="radio"
                                    value='Aberto'
                                    onChange={addStatus}
                                    checked={status == 'Aberto'}
                                />
                                <Span>Aberto</Span>
                                <Radio
                                    type="radio"
                                    onChange={addStatus}
                                    name="radio"
                                    value='Em atendimento'
                                    checked={status == 'Em atendimento'}
                                />
                                <Span>Em atendimento</Span>
                                <Radio
                                    onChange={addStatus}
                                    type="radio"
                                    name="radio"
                                    value='Finalizado'
                                    checked={status == 'Finalizado'}
                                />
                                <Span>Finalizado</Span>
                            </ContentStatus>
                            <Label>Informações Adicionais</Label>
                            <TextArea
                                disabled={loadingRegister}
                                ref={textAreaRef}
                                rows="5"
                                cols="40"
                                maxLength={1000}
                                placeholder="Digite algumas informações sobre o problema (opcional)"
                            >
                            </TextArea>
                            <SubbmitBTN
                                type="submit"
                                disabled={loadingRegister}
                            >
                                {
                                    !loadingRegister ? 'Salvar chamado' : 'Registrando'
                                }
                            </SubbmitBTN>
                        </FormTickets>)}
                    </ContentForm>
                </ContainerForm>
            </Content>
        </Container>
    )
}