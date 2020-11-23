import React, {useState, useEffect, useCallback } from 'react';
import api from '../../service/api';
import whatsapp from '../../assets/download.png';
import { RiMailSendFill } from 'react-icons/ri';
import { BiErrorAlt, BiError } from 'react-icons/bi';

import { toast } from 'react-toastify';

import { Container, PTable, Pagination, PaginationButton, PaginationItem} from './styles';

function FormPaciente () {
    const [mensagem, setMensagem] = useState('%20Informamos%20que%20a%20partir%20do%20mês%20de%20Agosto%20%20encerraremos%20as%20consultas%20no%20Harmony');

    const [valor, setValor] = useState(0);

    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() =>{

       async function loadUsers() {
            const response = await api.get(`/pacientes?page=${currentPage}&limit=${limit}`);
            setTotal(response.data.total);
            const totalPages = Math.ceil(total / limit);
            
            const arrayPages = [];

            for(let i = 1; i <= totalPages; i++) {
                arrayPages.push(i);
            }
            setUsers(response.data.pages.pacients);

            setPages(arrayPages);
        }
        
        loadUsers();


    }, [currentPage, limit, total, mensagem, valor]);
   
   async function sendValue(id, name) {

        const nome = name.split(' ');
        await api.put(`/pacientes/${id}`, {empresa: 1});

        toast.success(`🤙 Confirmado, você enviou a mensagem para ${nome[0]}!`, {autoClose: 3000,  });

        setValor(1);
    }
    

    async function sendValueInvalid(id, name) {
        const nome = name.split(' ');

        await api.put(`/pacientes/${id}`, {empresa: 2});
        toast.warn(`👏 Ok, foi cadastrado que não conseguimos entrar em contato com o(a) ${nome[0]}!`, {autoClose: 3000});

        setValor(2);
    }

    const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }, []);


    function separaItem(string) {
        const position = string.split('/')

        const valueItem = [];

        var i;
        for (i = 0; i < position.length; i++) {
            if(position[i].substring(0,1) === "9" | position[i].substring(0,1) === "8"){
                valueItem.push(position[i]);
            }
        }
        return valueItem
    }

    function transformJsx(object, name, msg) {

        const firstName = name.split(' ')

        const number = object.map((e)=> 
         e.length === 8 ?
         <tr>
         <a
         target="_blank" 
         href={`https://api.whatsapp.com/send?l=pt-BR&phone=55829${e}&text=Olá%20${firstName[0]}!${msg}`}>9{e}</a>
         </tr>
         :
        <tr>
            <a
            target="_blank" 
            href={`https://api.whatsapp.com/send?l=pt-BR&phone=5582${e}&text=Olá%20${firstName[0]}!${msg}`}>{e}</a>
        </tr>
        );

        return number;
    }

    return (
    
        <Container>
            <img src={whatsapp}/>
            <PTable>
                <thead>
                    <tr>
                        <th>Envio de Mensagem</th>
                        <th>Id do Paciente</th>
                        <th>Paciente</th>
                        <th>Data de Entrada no Sistema</th>
                        <th>Telefone 01</th>
                        <th>Telefone 02</th>
                        <select onChange={limits}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="35">35</option>
                            <option value="100">100</option>
                        </select>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <>
                            {(separaItem(user.phone_1).length > 0 || separaItem(user.phone_2).length > 0 ?
                            <tr key={user.id}>

                                <button className="send" placeholder="Validar Mensagem!" onClick={() => sendValue(user.id, user.name)}><RiMailSendFill/></button>
                                <button className="nosend"onClick={() => sendValueInvalid(user.id, user.name)}><BiErrorAlt/></button>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.cadastro}</td>
                                <td>{transformJsx(separaItem(user.phone_1),user.name, mensagem)}
                                </td>
                                <td>{transformJsx(separaItem(user.phone_2),user.name, mensagem)}</td>
                            </tr>  :  <h1></h1> )}
                        </>
                    ))}
                </tbody>
            </PTable>
            <div>Total de pacientes: {total}</div>
            <Pagination>
                   
                    <PaginationButton>
                        {currentPage > 1 && (
                            <PaginationItem onClick={() => setCurrentPage(currentPage - 1 )}>Previous</PaginationItem>
                        )}
                        {pages.map(page => (
                            <PaginationItem 
                            isSelect={page === currentPage}
                            key={page}
                            onClick={() => setCurrentPage(page)}>{page}</PaginationItem>
                        ))}
                        {currentPage < pages.length && (
                            <PaginationItem onClick={() => setCurrentPage(currentPage + 1)}>Next</PaginationItem>
                        )}
                    </PaginationButton>
            </Pagination>
        </Container>
    )};
    

export default FormPaciente;