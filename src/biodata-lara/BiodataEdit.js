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
            no_hp   : '',
            pekerjaan   : '',
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
            no_hp: response.data.no_hp,
            pekerjaan: response.data.pekerjaan
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
            no_hp:this.state.no_hp,
            pekerjaan:this.state.pekerjaan,
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
                        <label htmlFor='no_hp'>NIM</label>
                        <input
                          id='no_hp'
                          type='text'
                          className={`form-control ${this.hasErrorFor('no_hp') ? 'is-invalid' : ''}`}
                          name='no_hp'
                          value={this.state.no_hp}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('no_hp')}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='pekerjaan'>IPK</label>
                        <input
                          id='pekerjaan'
                          type='number'
                          className={`form-control ${this.hasErrorFor('pekerjaan') ? 'is-invalid' : ''}`}
                          name='pekerjaan'
                          value={this.state.pekerjaan}
                          onChange={this.handleFieldChange}
                        />
                        {this.renderErrorFor('pekerjaan')}
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