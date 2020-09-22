import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
 
class BiodataIndex extends Component {
     
    constructor () {
        super()
        this.state = {
            biodatas: [],
            msg: null,
            type: null,
            flash:false,
            alert: null,
        }
    }
 
    hideAlert() {
        this.setState({
            alert: null
        });
    }
 
    componentDidMount () {


        axios.get('http://127.0.0.1:8000/api/all').then(response => {
            this.setState({
                biodatas: response.data
            })
        })  

       
    }
 
    onSuccess(){
        this.componentDidMount();
        this.hideAlert();
    }

    confirmDelete(id){
        const getAlert = () => (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Hapus Deh"
                cancelBtnText="Nggak Jadi"
                confirmBtnBsStyle="default"
                cancelBtnBsStyle="danger"
                title="Tunggu ..."
                onConfirm={() => this.deleteItem(id)}
                onCancel={() => this.hideAlert()}
                focusCancelBtn
                >
                Yakin Dihapus?
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }
    deleteItem(id) {
        axios.delete(`http://localhost:8000/api/biodata/${id}`).then(response => {
            var msg = response.data.success;
            if(msg === true){
                this.hideAlert();
                this.goToHome();
            }
        })
    }

    goToHome(){
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess() }
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Oke Siap"
                >
                Deleted article successfully
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }
 
    render () {
        const { biodatas } = this.state
        return (
          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-8'>
                <div className='card'>
                  <div className='card-header'>Data Mahasiswa</div>
                  <div className='card-body'>
                    <Link className='btn btn-primary btn-sm mb-3' to='/lara/create'>
                      Buat Data Mahasiswa Baru
                    </Link>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th width="50" className="text-center">No</th>
                                    <th width="400" className="text-center">Nama</th>
                                    <th width="100" className="text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {biodatas.map((biodata, i) => (
                                <tr key={i}>
                                    <td width="50" className="text-center">{i + 1}</td>
                                    <td>{biodata.nama}</td>
                                   
                                    <td>
                                    <button
                                            className='badge badge-danger badge-pill'
                                            onClick={() => this.confirmDelete(biodata.id)}
                                            >Delete
                                    </button>
                                    <Link
                                            className='badge badge-success badge-pill'
                                            to={`lara/detail/${biodata.id}`}
                                            >
                                            Detail
                                    </Link>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        {this.state.alert}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}
 
export default BiodataIndex