import Header from "../../components/Header";
import Title from "../../components/Title";
import {
    Container,
    Content,
    TicketsContent,
    TicketsTable,
    TicketsTd,
    TicketsThead,
    TicketsTr,
    TicketsTh,
    TicketsTbody,
    ActionBTN,
    TicketsCreateButton,
    CreateTicketsArea,
    AlertText,
    Loading,
    LoadMoreBtn,
} from "./styles";
import { IoIosSearch } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdOutlineComputer } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import {
    useEffect,
    useState
} from "react";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";

function Dashboard() {

    const navigation = useNavigate()
    const [tickets, setTickets] = useState([])
    const [loadingTickets, setLoadingTickets] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [info, setInfo] = useState('')
    const [lastDoc, setLastDoc] = useState(null)
    const [moreBtn, setMoreBtn] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    let count = 1
    const docRef = collection(db, 'ticketsCollection')

    useEffect(() => {
        async function loadTickets() {
            try {
                const params = query(docRef, orderBy('createdAt', 'asc'), limit(5)) // Buscar apenas 5 chamados.
                const docSnap = await getDocs(params)
                let data = []
                docSnap.forEach((doc) => {
                    data.push({
                        customerId: doc.data().id,
                        customer: doc.data().customer,
                        topic: doc.data().topic,
                        status: doc.data().status,
                        createdAt: doc.data().createdAt.toDate().toLocaleString(),
                        createdAtFormated: doc.data().createdAtFormated,
                        complement: doc.data().complement || '',
                        id: doc.id,
                    })
                })
                setLastDoc(docSnap.docs[data.length - 1])
                setTickets(data)
            } catch (error) {
                console.log(error.messageF)
            } finally {
                setLoadingTickets(false)
            }
        }
        loadTickets()
        return () => { }
    }, [])

    function handleModal(event, data) {
        event.preventDefault()
        setInfo(data)
        setModalVisible(true)
    }

    async function handleMore(event) {
        event.preventDefault()
        setLoadingMore(true)
        try {
            let data = []
            const params = query(docRef, orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(5))
            const querySnap = await getDocs(params)
            if (!querySnap.empty) {
                querySnap.forEach((doc) => {
                    data.push({
                        customerId: doc.data().id,
                        customer: doc.data().customer,
                        topic: doc.data().topic,
                        status: doc.data().status,
                        createdAt: doc.data().createdAt.toDate().toLocaleString(),
                        createdAtFormated: doc.data().createdAtFormated,
                        complement: doc.data().complement || '',
                        id: doc.id,
                    })
                })
                setLastDoc(querySnap.docs[querySnap.docs.length - 1])
                setTickets(tickets => [...tickets, ...data])
            } else {
                setMoreBtn(false)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoadingMore(false)
        }
    }

    function getStatusColor(status) {
        if (status === 'Aberto') return { background: "#00ff1c", }
        if (status === 'Em atendimento') return { background: "#ecff00" }
        if (status === 'Finalizado') return { background: "#ff0000" }
    }

    if (loadingTickets) {
        return (
            <Loading>
                Carregando...
            </Loading>
        )
    }

    return (
        <Container>
            <Header />
            <Content>
                <Title text='Chamados'>
                    <MdOutlineComputer />
                </Title>
                <TicketsContent>
                    <CreateTicketsArea>
                        {tickets.length <= 0 && <AlertText>
                            Nenhum chamado registrado....
                        </AlertText>}
                        <TicketsCreateButton
                            to={'/new-tickets'}
                        >
                            <FiPlus
                                color="#fff"
                                size={35}
                            />
                            Criar novo chamado
                        </TicketsCreateButton>
                    </CreateTicketsArea>
                    {tickets.length > 0 && (
                        <TicketsTable>
                            {/* Renderiza o cabeçalho apenas uma vez */}
                            <TicketsThead>
                                <TicketsTr>
                                    <TicketsTh>Ordem de atendimento</TicketsTh>
                                    <TicketsTh>Cliente</TicketsTh>
                                    <TicketsTh>Assunto</TicketsTh>
                                    <TicketsTh>Status</TicketsTh>
                                    <TicketsTh>Data de abertura</TicketsTh>
                                    <TicketsTh></TicketsTh>
                                </TicketsTr>
                            </TicketsThead>
                            {/* Renderiza as linhas dinamicamente */}
                            <TicketsTbody>
                                {tickets.map((ticket, index) => (
                                    <TicketsTr key={ticket.id || index}>
                                        <TicketsTd>{count++}</TicketsTd>
                                        <TicketsTd>{ticket.customer}</TicketsTd>
                                        <TicketsTd>{ticket.topic}</TicketsTd>
                                        <TicketsTd style={getStatusColor(ticket.status)}>
                                            {ticket.status}</TicketsTd>
                                        <TicketsTd>{ticket.createdAt}</TicketsTd>
                                        <TicketsTd>
                                            <ActionBTN $bgColor={'#4c79f1'} onClick={(event) => handleModal(event, ticket)} >
                                                <IoIosSearch color="#fff" size={25} />
                                            </ActionBTN>
                                            <ActionBTN $bgColor={'#f1db4c'} onClick={() => navigation(`/new-tickets/${ticket.id}`)}>
                                                <CiEdit color="#fff" size={25} />
                                            </ActionBTN>
                                        </TicketsTd>
                                    </TicketsTr>
                                ))}
                            </TicketsTbody>
                        </TicketsTable>
                    )}
                    {!tickets.length <= 0 && moreBtn && <LoadMoreBtn disabled={loadingMore} onClick={handleMore}> {loadingMore ? "Carregando..." : "Buscar mais chamados"}</LoadMoreBtn>}
                </TicketsContent>
            </Content>
            {modalVisible && <Modal ticketData={info} visible={() => setModalVisible(!modalVisible)} />}
        </Container >
    );
}

export default Dashboard;
