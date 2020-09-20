import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';
 
    class BiodataEdit extends Component {
      constructor (props) {
        super(props)
        this.state = {
            id    : '',
            nama  : '',
            email : '',
            nim   : '',
            ipk   : '',
            alert : null,
            message: '',
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handlefieldStudent = this.handlefieldStudent.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
      }
 
      handleFieldChange (event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
 
      componentDidMount () {
 
        const biodataId = this.props.match.params.id
 
        axios.get(`http://localhost:8000/api/getMhs/${biodataId}`).then(response => {
          this.setState({
            id : response.data.id,
            nama: response.data.nama,
            email: response.data.email,
            nim: response.data.nim,
            ipk: response.data.ipk
          })
        })
      }
 
      goToHome(){
        const getAlert = () => (
            <SweetAlert
                success
                title="Berhasil!"
                onConfirm={() => this.onSuccess() }
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Oke Siap"
                >
                {this.state.message}
            </SweetAlert>
          );
          this.setState({
            alert: getAlert() 
          });
      }
 
      onSuccess() {
        
        this.props.history.push('/detail/'+this.state.id);
      }
 
      hideAlert() {
        this.setState({
          alert: null
        });
      }
 
      handlefieldStudent (event) {
        event.preventDefault()
 
        const biodata = {
            nama: this.state.nama,
            email:this.state.email,
            nim:this.state.nim,
            ipk:this.state.ipk,
        }
 
        const biodataId = this.props.match.params.id
 
        axios.post(`http://localhost:8000/api/update/${biodataId}`, biodata)
          .then(response => {
            // redirect to the homepage
            var msg = response.data.success;
            if(msg === true){
                this.setState({
                    message: response.data.message
                })
                return this.goToHome();
            }
 
          });
      }
 
      hasErrorFor (field) {
        return !!this.state.errors[field]
      }
 
      renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
          return (
            <span className='invalid-feedback'>
              <strong>{this.state.errors[field][0]}</strong>
            </span>
          )
        }
      }
 
      render () {
        // const { biodata } = this.state
        return (
          <div className='container py-4'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <div className='card'>
                  <div className='card-header'>Edit Data Mahasiswa</div>
                  <div className='card-body'>
                    <form onSubmit={this.handlefieldStudent}>
                      <div className='form-group'>
                        <label htmlFor='nama'>Nama</label>
                        <input
                          id='nama'
                          type='text'
                          className={`form-control ${this.hasErrorFor('nama') ? 'is-invalid' : ''}`}
                          name='nama'
                          value={this.state.nama}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('nama')}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                          id='email'
                          type='text'
                          className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                          name='email'
                          value={this.state.email}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('email')}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='nim'>NIM</label>
                        <input
                          id='nim'
                          type='text'
                          className={`form-control ${this.hasErrorFor('nim') ? 'is-invalid' : ''}`}
                          name='nim'
                          value={this.state.nim}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('nim')}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='ipk'>IPK</label>
                        <input
                          id='ipk'
                          type='number'
                          className={`form-control ${this.hasErrorFor('ipk') ? 'is-invalid' : ''}`}
                          name='ipk'
                          value={this.state.ipk}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('ipk')}
                      </div>
                      <Link
                        className='btn btn-secondary'
                        to={`/`}
                        >Back
                      </Link>
                      
                      <button className='btn btn-success'>Update</button>
                      {this.state.alert}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
export default BiodataEdit